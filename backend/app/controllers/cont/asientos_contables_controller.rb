# Controlador para la tabla Asientos Contables en el namespace Cont
class Cont::AsientosContablesController < ApplicationController
  before_action :asiento_find, :documento_find, :movimiento_contable_find, only: [:show]
  
  # Acción index para listar los registros de la tabla
  def index
    # Seleccionar los campos deseados de la tabla y paginar el resultado
    asiento = Cont::AsientoContableUa
      .select(:iddoc, :descasiento, :refdoc, :anocont, :percont, :fecasiento, :numpublicacion, :stsasiento)
      .where(stsasiento: ["REC", "RCH"])
      .page(params[:page])
      .per(10)
    # Renderizar los resultados como JSON, incluyendo los métodos por defecto
    render json: asiento.as_json(methods: json_default_asiento_mto)
  end

  # Acción show para mostrar un registro específico de la tabla
  def show
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {cabasiento:@asiento.as_json(methods: json_default_asiento),
                  cabdocumento:@documento.as_json(methods: json_default_documento),
                  detasiento:@movimiento_contable.as_json(methods: json_default_detasiento)}
  end

  # Acción show para mostrar un registro específico de la tabla
  def lst_benefat
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lstBenef:@lst_benef_activo.as_json(methods: json_lst_benef_activo),
                  error: @lst_benef_activo.errors.full_messages.first}
  end

  # Acción lst_cta_pub para mostrar una lista de cuentas de la publicacón
  def lst_cta_pub
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lstctapub:@lst_cta_publicacion.as_json,
                  error: @lst_cta_publicacion.errors.full_messages.first}
  end

  # Acción lst_cod_axu para mostrar una lista de códigos de auxiliares
  def lst_cod_axu
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lstcodaxu:@lst_cod_auxiliar.as_json,
                  error: @lst_cod_auxiliar.errors.full_messages.first}
  end

  # Acción lst_tip_doc_cont para mostrar una lista de los tipos de documentos de COCNT
  def lst_tip_doc_cont
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lsttipdoccont:@lst_tipodoc_cont.as_json,
                  error: @lst_tipodoc_cont.errors.full_messages.first}
  end
  
  # Acción UPDATE para actualizar los cambios del front-end
  def update
    # Encontramos el Asientos Contables  
    asientos = Cont::AsientoContable.find_by(idasiento: params[:idasiento])
    asientos.attributes = update_asientos_params

    # Evaluamos que la fecha del Asiento no se mayor a la de Dia 
    if asientos.fecasiento.strftime("%d/%m/%Y") > Time.now.strftime("%d/%m/%Y") 
      render json: { message: "La fecha del asiento debe ser menor o igual que la fecha actual." }
    else
      # Bbuscamos los parametros de control
      controcf = Cont::ControlCf.first
      
      # Determinamos el Año y Periodo a partir de la fecha del asiento
      nanod = asientos.fecasiento.strftime('%Y').to_i
      nperd = asientos.fecasiento.strftime('%m').to_i

      # Comparamos Ano y periodo del asiento con el de los parametros de control
      if asientos.anocont == controcf.anocont
        if asientos.percont < controcf.percont
          render json: { message: "El Periodo Contable ya está cerrado." }
        end
      elsif asientos.anocont < controcf.anocont
        render json: { message: "El Año Contable ya está cerrado." }
      end

      # Se verifica si el ano y periodo del asiento es diferente a la de la fecah del asiento
      if asientos.anocont != nanod || asientos.percont != nperd
        asientos.anocont = nanod
        asientos.percont = nperd
      end

      # Si se guarda bien asientos
      if asientos.save
        # Encontramos los datos de documento_origen
        documentos_origen = Doc::DocumentoOrigen.find_by(iddoc: asientos.iddoc)
        documentos_origen.attributes = update_documentos_origen_params
        
        #Valido la descripción del asiento con la del documento
        if asientos.descasiento != documentos_origen.descdoc
          documentos_origen.descdoc = asientos.descasiento
        end

        # Se verifica si la fecha del documentos es distinta a la del asiento
        if documentos_origen.fecdoc != asientos.fecasiento
          documentos_origen.ano = nanod
          documentos_origen.fecdoc = asientos.fecasiento

          # Información monetaria
          #Establecer Moneda del documento
          documentos_origen.codmonedamtodoc = plsql.proc_instalacion.codmonedainst(documentos_origen.fecdoc)

          # Se verifica si la fecha del documentos es mayor a la de la reconversion
          if documentos_origen.fecdoc >  plsql.proc_reconv_knt.fecha_reconv 
            documentos_origen.codmoneda = plsql.proc_reconv_knt.codmoneda_post
          else
            documentos_origen.codmoneda = plsql.proc_reconv_knt.codmoneda_pre
          end

          # Calculamos el monto del Documento
          if documentos_origen.codmoneda
            documentos_origen.tasa = plsql.proc_moneda.tasa(documentos_origen.codsitio, documentos_origen.codmoneda, documentos_origen.codmonedamtodoc, documentos_origen.fecdoc);
            documentos_origen.mtodoc = (documentos_origen.montoorig.nil? ? 0 : documentos_origen.montoorig) * (documentos_origen.tasa.nil? ? 1 : documentos_origen.tasa)
          end
        end
        
        # Si se guarda bien documentos_origen, enviamos los 2 render
        if documentos_origen.save
          render json: {asiento:asientos.as_json,
                        doc:documentos_origen.as_json}
        else
          render json: documentos_origen.errors.full_messages.first, status:415
        end
      else
        render json: asientos.errors.full_messages.first, status:415
      end
    end
  end

  #Metodos que solo puedo usar en el controlador
  private

  # Método privado para encontrar un asiento por su IdDoc
  def asiento_find
    #@ es un variable que puedo usar en toda la instancia del controlador
    @asiento = Cont::AsientoContable.where(idasiento: params[:idasiento]).first
  end

  # Método privado para encontrar un documento por su IdDoc
  def documento_find
    @documento = Doc::DocumentoOrigen.where(iddoc: @asiento.iddoc).first
  end

  # Método privado para encontrar uel detalle de un asiento por IdAsiento
  def movimiento_contable_find
    @movimiento_contable = Cont::MovimientoContable.where(idasiento: @asiento.idasiento)
  end

  # Método privado para obtener la lista de beneficiarios activos
  def lst_benef_activo
    @lst_benef_activo = Doc::VBenefActivo.select(:nombre, :numbenef)
  end

  # Método privado para obtener la lista de cuentas de la publicación 
  def lst_cta_publicacion
    @lst_cta_publicacion = Cont::CuentaPublicacion
      .select(:codcuenta, :desccuenta, :tipoauxiliar)
      .where(numpublicacion: params[:numpublicacion],  tipo: 'D')
  end

  # Método privado para obtener la lista de codigos de auxiliares
  def lst_cod_auxiliar
    @lst_cod_auxiliar = Cont::Auxiliar
      .select(:codauxiliar, :descauxiliar) 
      .where(tipoauxiliar: params[:tipoauxiliar], indactivo: 'D')
  end

    # Método privado para obtener la lista de los tipos de documentos de CONT
  def lst_tipodoc_cont
    @lst_tipodoc_cont = Cont::DefEventoCf.select(:tipodoc).first.TipoDocumento
  end

  # Definir los métodos por defecto a incluir en el resultado JSON
  # Asiento monto
  def json_default_asiento_mto
    %i[
      dsp_MtoDoc
    ]
  end

  # Para el Asiento
  def json_default_asiento
    %i[
      dsp_IndSisReg
    ]
  end

  # Para la información del Documento
  def json_default_documento
    %i[
      rifbenef
      dsp_nombrebenef
      dsp_desctipodoc
    ]
  end

  # Para el detalle del asiento
  def json_default_detasiento
    %i[
      dsp_DesCtaPub
      dsp_DescAuxiliar
      dsp_CuentaPadre
    ]
  end

  # Para la lista de Beneficiarios Activo
  def json_lst_benef_activo
    %i[
      rifbenefact
    ]
    end
  
  #Métodos para la definición de parámetros
  def update_asientos_params
    params.require(:data_asiento).permit(:fecasiento, :descasiento)
  end

  def update_documentos_origen_params
    params.require(:data_documento).permit(:tipodoc, :numbenef, :indreverso, :iddocref, :refdoc, :codsitio, :codmoneda, 
          :montoorig)
  end

  def update_movimientos_asiento_params
    params.require(:data_movimiento).permit(:nummov,:anocont,:percont, :numpublicacion, 
          :codcuenta, :tipoauxiliar, :codauxiliar, :montodb, :montocr,:codmoneda, :descmov)
  end
end
