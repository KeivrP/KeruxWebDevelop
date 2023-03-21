# Controlador para la tabla Asientos Contables en el namespace Cont
class Cont::AsientosContablesController < ApplicationController
  before_action :asiento_find, :documento_find, :movimiento_contable_find, only: [:show]

  # Acción index para listar los registros de la tabla
  def index
    # Seleccionar los campos deseados de la tabla y paginar el resultado   
    plsql.proc_ctx_uejeproc.set_undadmpro("ROBERTO")

    asiento = Cont::AsientoContable.joins(:DocumentoOrigen)
      .select(:iddoc, :idasiento, :descasiento, :refdoc, :anocont, :percont, :fecasiento, :numpublicacion, :stsasiento)
      .where(stsasiento: ["REC", "RCH"], DocumentoOrigen: { codundadmpro: plsql.proc_ctx_uejeproc.get_undadmpro })
      .page(params[:page])
      .per(params[:per])
      .order(iddoc: :desc)
    # Renderizar los resultados como JSON, incluyendo los métodos por defecto
    render json: asiento.as_json(methods: json_default_asiento_mto)
  end

  # Acción show para mostrar un registro específico de la tabla
  def show
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: { cabasiento: @asiento.as_json(methods: json_default_asiento),
                   cabdocumento: @documento.as_json(methods: json_default_documento),
                   detasiento: @movimiento_contable.as_json(methods: json_default_detasiento) }
  end

  # Acción lst_benefat para mostrar una lista de beneficiarios activos
  def lst_benefat
    lst_benef_activo = Doc::VBenefActivo.all.map do |benef|
      {
        nombre: benef.nombre,
        numbenef: benef.numbenef,
        rifbenef: "#{benef.letraid}-#{benef.numid}",
      }
    end

    if !lst_benef_activo.empty?
      render json: lst_benef_activo.as_json
    else
      render json: { message: "No se encontraron registros" }
    end
  end

  # Acción lst_cta_pub para mostrar una lista de cuentas de la publicacón
  def lst_cta_pub
    lst_cta_publicacion = Cont::CuentaPublicacion.select(:codcuenta, :desccuenta, :tipoauxiliar)
      .where(numpublicacion: params[:numpublicacion], tipo: "D").all

    if !lst_cta_publicacion.empty?
      render json: lst_cta_publicacion.as_json
    else
      render json: { message: "No se encontraron registros" }
    end
  end

  # Acción lst_cod_axu para mostrar una lista de códigos de auxiliares
  def lst_cod_axu
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    lst_cod_auxiliar = Cont::Auxiliar.select(:codauxiliar, :descauxiliar).where(tipoauxiliar: params[:tipoauxiliar], indactivo: "S")

    if !lst_cod_auxiliar.empty?
      render json: lst_cod_auxiliar.as_json
    else
      render json: { message: "No se encontraron registros" }
    end
  end

  # Acción lst_tip_doc_cont para mostrar una lista de los tipos de documentos de CONT
  def lst_tip_doc_cont
    lst_tipodoc_cont = Cont::DefEventoCf.joins(:TipoDocumento).select(:tipodoc, :desctipodoc, :tipodocref, :indrefdoc)
      .where(numpublicacion: params[:numpublicacion], TipoDocumento: { indactivo: "S", codruta: Doc::PasoRuta.select(:codruta).where(tipoevento: "RCM", codproxsis: "CONT") })

    if !lst_tipodoc_cont.empty?
      render json: lst_tipodoc_cont.as_json
    else
      render json: { message: "No se encontraron registros" }
    end
  end

  # Acción lst_doc_ref para mostrar una lista de los documentos de referencia
  def lst_doc_referencia
    if params[:indreverso] = "S" || params[:indrefdoc] = "S"
      if params[:tipodocref].nil?
        lst_doc_referencia = Doc::DocumentoOrigen
          .select(:iddoc, :descdoc, :numbenef)
          .where(numbenef: [params[:numbenef], 99999999]).all
      else
        lst_doc_referencia = Doc::DocumentoOrigen
          .select(:iddoc, :descdoc, :numbenef)
          .where(tipodoc: params[:tipodocref], numbenef: [params[:numbenef], 99999999]).all
      end
    end

    if !lst_doc_referencia.empty?
      render json: lst_doc_referencia.as_json
    else
      render json: { message: "No se encontraron registros" }
    end
  end

  # Acción lst_moneda para mostrar una lista de las monedas disponibles
  def lst_moneda
    lst_moneda = Kentron::Moneda.joins(:Sitio).where(Sitio: { codsitio: params[:codsitio] }).select(:codmoneda, :nommoneda)
      .where("(fecvigini is null or fecvigini <= ?) and (fecvigfin is null or fecvigfin >= ?)", params[:fecdoc], params[:fecdoc]).all

    if !lst_moneda.empty?
      render json: lst_moneda.as_json
    else
      render json: { message: "No se encontraron registros" }
    end
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
      # Buscamos los parametros de control
      controcf = Cont::ControlCf.first

      # Determinamos el Año y Periodo a partir de la fecha del asiento
      nanod = asientos.fecasiento.strftime("%Y").to_i
      nperd = asientos.fecasiento.strftime("%m").to_i

      # Comparamos Ano y periodo del asiento con el de los parametros de control
      if asientos.anocont == controcf.anocont
        if asientos.percont < controcf.percont
          render json: { message: "El Periodo Contable ya está cerrado." }
        end
      elsif asientos.anocont < controcf.anocont
        render json: { message: "El Año Contable ya está cerrado." }
      end

      # Se verifica si el año y período del asiento es diferente a la de la fecha del asiento
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
          if documentos_origen.fecdoc > plsql.proc_reconv_knt.fecha_reconv
            documentos_origen.codmoneda = plsql.proc_reconv_knt.codmoneda_post
          else
            documentos_origen.codmoneda = plsql.proc_reconv_knt.codmoneda_pre
          end

          # Calculamos el monto del Documento
          if documentos_origen.codmoneda
            documentos_origen.tasa = plsql.proc_moneda.tasa(documentos_origen.codsitio, documentos_origen.codmoneda, documentos_origen.codmonedamtodoc, documentos_origen.fecdoc)
            documentos_origen.mtodoc = (documentos_origen.montoorig.nil? ? 0 : documentos_origen.montoorig) * (documentos_origen.tasa.nil? ? 1 : documentos_origen.tasa)
          end
        end

        # Si se guarda bien documentos_origen, enviamos los 2 render
        if documentos_origen.save
          # Encontramos los datos del movimiento
          movimientos = Cont::MovimientoContable.where(idasiento: asientos.idasiento)
          movimientos.each do |m| #Inicia ciclo
            m.anocont = asientos.anocont
            m.percont = asientos.percont
            m.save
          end #fin del each

          render json: { message: "Asiento guardado con éxito." }
        else
          render json: documentos_origen.errors.full_messages.first, status: 415
        end
      else
        render json: asientos.errors.full_messages.first, status: 415
      end
    end
  end

  # Acción update_movimiento para actualizar los cambios del front-end
  def update_movimiento
    # Encontramos el Asientos Contables
    asientos = Cont::AsientoContable.find_by(idasiento: params[:idasiento])
    # Encontramos el movimiento
    movimientos = Cont::MovimientoContable.find_by(idasiento: params[:idasiento], nummov: params[:nummov])
    # Si el movimiento es nulo hacemos un new, de los contrario un update
    if movimientos.nil?
      movimientos_new = Cont::MovimientoContable.new(idasiento: params[:idasiento], nummov: params[:nummov], anocont: asientos.anocont, percont: asientos.percont,
                                                     numpublicacion: asientos.numpublicacion, codcuenta: update_movimientos_asiento_params[:codcuenta],
                                                     tipoauxiliar: update_movimientos_asiento_params[:tipoauxiliar], codauxiliar: update_movimientos_asiento_params[:codauxiliar],
                                                     montodb: update_movimientos_asiento_params[:montodb], montocr: update_movimientos_asiento_params[:montocr],
                                                     codmoneda: asientos.codmoneda, descmov: update_movimientos_asiento_params[:descmov])

      if movimientos_new.save
        render json: movimientos_new.as_json
      else
        render json: movimientos_new.errors.full_messages.first, status: 415
      end
    else
      movimientos.attributes = update_movimientos_asiento_params

      #Evaluamos si el anocont y percont del asiento es diferente al del movimiento
      if movimientos.anocont != asientos.anocont
        movimientos.anocont = asientos.anocont
      elsif movimientos.percont != asientos.percont
        movimientos.percont = asientos.percont
      end

      #Validar movimiento
      @mensaje = validar_movimiento(movimientos)
      # Si se guarda bien movimientos
      if @mensaje.nil?
        if movimientos.save
          render json: movimientos.as_json
        else
          render json: movimientos.errors.full_messages.first, status: 415
        end
      else
        render json: { message: @mensaje }
      end
    end
  end

  # Acción delete_movimiento para actualizar los cambios del front-end
  def delete_movimiento
    # Encontramos el movimiento
    movimientos = Cont::MovimientoContable.find_by(idasiento: params[:idasiento], nummov: params[:nummov])
    movimientos.destroy
  end

  #Metodos para los botones de la pantalla

  #Botón para validar asiento
  def boton_validar
    @movimiento_val = Cont::MovimientoContable.where(idasiento: params[:idasiento])
    @mensaje = validar_asiento(@movimiento_val)
    render json: { message: @mensaje }
  end

  #Botón para verificar asiento
  def boton_verificar
    @movimiento_ver = Cont::MovimientoContable.where(idasiento: params[:idasiento])
    @asiento = Cont::AsientoContable.where(idasiento: params[:idasiento]).first
    @mensaje = verifica_asiento(@movimiento_ver, @asiento)
    render json: { message: @mensaje }
  end

  #Metodos que solo puedo usar en el controlador
  private

  #Metodo que valida el detalle de los movimientos que recibe del fronted para boton_validar
  def validar_asiento(movimiento)
    total_debito = movimiento.sum(:montodb)
    total_credito = movimiento.sum(:montocr)

    if total_debito == total_credito
      #Inicia ciclo
      movimiento.each do |m|
        @mensaje = validar_movimiento(m)
        #valida por movimiento si existe error retornarlo
        if @mensaje != nil
          return @mensaje
        end
      end #fin del each

      if @mensaje.nil?
        return "Validación Satisfactoria."
      else
        return @mensaje
      end
    else
      return "Los totales del asiento no cuadran."
    end
  end

  #Metodo que valida el detalle de los movimientos que recibe del fronted para boton_validar
  def validar_movimiento(detmovimiento)
    #Evaluamos el tipo auxiliar y código de auxiliar
    if detmovimiento.tipoauxiliar != nil && detmovimiento.codauxiliar == nil
      return "Debe ingresar un auxiliar a la cuenta."
    end

    #Evaluamos que los montos de débito y crédito no sean 0
    if (detmovimiento.montodb.nil? ? 0 : detmovimiento.montodb) == 0 && (detmovimiento.montocr.nil? ? 0 : detmovimiento.montocr) == 0
      return "El movimiento debe tener monto en débito o en crédito."
    end

    #Evaluamos que tenga monto mayor a cero solo el débito o el crédito
    if (detmovimiento.montodb.nil? ? 0 : detmovimiento.montodb) != 0 && (detmovimiento.montocr.nil? ? 0 : detmovimiento.montocr) != 0
      return "El movimiento sólo puede tener monto en débito o en crédito."
    end
  end

  def verifica_asiento(movimiento, asiento)
    @mensaje = validar_asiento(movimiento)

    #Asigno a variable la suma de todos los debitos y creditos de los movimientos
    total_debito = movimiento.sum(:montodb)
    total_credito = movimiento.sum(:montocr)

    if asiento.totdbcomp != total_debito
      return "El Total de DÉBITOS es incorrecto"
    end
    if asiento.totcrcomp != total_credito
      return"El Total de CRÉDITOS es incorrecto"
    end

    if @mensaje != "Validación Satisfactoria."
      return @mensaje
    else
      #Inicia ciclo
      movimiento.each do |detmov|
        @mensaje = validar_asi_and_mov(detmov, asiento)
        #valida por movimiento si existe error retornarlo
        if @mensaje != nil
          return @mensaje
        end
      end #fin del each

      fecactual = Time.now

      if @mensaje.nil?
        asiento.stsasiento = "COD"
        asiento.fecreg = fecactual.strftime("%d/%m/%Y %H:%M:%S")
        asiento.usureg = "ROBERTO"
        if asiento.save
          return "El documento ha sido Codificado satisfactoriamente."
        end
      else
        return @mensaje
      end
    end
  end

  def validar_asi_and_mov(movimiento, asiento)

    #Buscamos los datos de la tabla control_cf y validamos que existan datos en la tabla
    controlcf = Cont::ControlCf.first

    if (controlcf.anocont == nil && controlcf.percont == nil)
      return "No existe el Registro de Control Contable."
    end

    #Valido que el año y periodo del asiento no sean de año o periodo cerrado
    if asiento.anocont == controlcf.anocont
      if asiento.percont < controlcf.percont
        return "El Periodo del Asiento es de un periodo ya cerrado"
      end
    elsif asiento.anocont < controlcf.anocont
      return "El Año del Asiento es de un año ya cerrado"
    end

    if asiento.anocont != movimiento.anocont
      return "El Año del Movimiento no coincide con el del Asiento"
    end

    if asiento.percont != movimiento.percont
      return "El Periodo del Movimiento no coincide con el del Asiento"
    end

    if asiento.numpublicacion != movimiento.numpublicacion
      return "El Número de la Publicación no coincide con la del Asiento"
    end

    cuentaspub = Cont::CuentaPublicacion.where(tipo: "D", numpublicacion: movimiento.numpublicacion, codcuenta: movimiento.codcuenta).first

    if cuentaspub.nil?
      return "No existe la cuenta especificada en la Publicación"
    end

    if movimiento.tipoauxiliar != cuentaspub.tipoauxiliar
      return "El Tipo de Auxiliar del Movimiento no coincide con el de la Cuenta"
    end

    auxiliar = Cont::Auxiliar.select(:codauxiliar).where(tipoauxiliar: movimiento.tipoauxiliar)

    if auxiliar.nil?
      return "No existe el Código del Auxiliar indicado en la Cuenta"
    end

    #valido montos totales del asiento
    if asiento.totdbcomp != asiento.totcrcomp
      return "Los totales del Asiento NO cuadran"
    end
  end #fin del metodo validar_asi_and_mov

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

  # Método privado para obtener la lista de los tipos de documentos de CONT

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
      dsp_tiponombre
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

  #Métodos para la definición de parámetros
  def update_asientos_params
    params.require(:data_asiento).permit(:fecasiento, :descasiento)
  end

  def update_documentos_origen_params
    params.require(:data_documento).permit(:tipodoc, :numbenef, :indreverso, :iddocref, :refdoc, :codsitio, :codmoneda,
                                           :montoorig)
  end

  def update_movimientos_asiento_params
    params.require(:data_movimiento).permit(:anocont, :percont, :numpublicacion, :codcuenta, :tipoauxiliar,
                                            :codauxiliar, :montodb, :montocr, :codmoneda, :descmov)
  rescue ActionController::ParameterMissing => e
    # Si ocurre un error de parámetro faltante, se retorna un hash vacío
    {}
  end
end
