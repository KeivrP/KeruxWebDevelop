# Controlador para la tabla Asientos Contables en el namespace Cont
class Cont::AsientosContablesController < ApplicationController
  before_action :asiento_find, :documento_find, :movimiento_contable_find, only: [:show, :show_prueba]

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
    render json: @asiento.as_json(methods: json_default_methods)
  end

  # Acción show para mostrar un registro específico de la tabla
  def show_prueba
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {cabasiento:@asiento.as_json(methods: json_default_asiento),
                  cabdocumento:@documento.as_json(methods: json_default_documento),
                  detasiento:@movimiento_contable.as_json(methods: json_default_detasiento),
                  error: @asiento.errors.full_messages.first
                  }
  end

  # Acción show para mostrar un registro específico de la tabla
  def lst_benefat
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lstBenef:@lst_benef_activo.as_json(methods: json_lst_benef_activo),
                  error: @lst_benef_activo.errors.full_messages.first
                  }
  end

  # Acción show para mostrar una lista de cuentas de la publicacón
  def lst_cta_pub
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lstctapub:@lst_cta_publicacion.as_json,
                  error: @lst_cta_publicacion.errors.full_messages.first
                  }
  end

  # Acción show para mostrar una lista de códigos de auxiliares
  def lst_cod_axu
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lstcodaxu:@lst_cod_auxiliar.as_json,
                  error: @lst_cod_auxiliar.errors.full_messages.first
                  }
  end

  # Acción show para mostrar una lista de códigos de auxiliares
  def lst_tip_doc_cont
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: {lsttipdoccont:@lst_tipodoc_cont.as_json,
                  error: @lst_tipodoc_cont.errors.full_messages.first
                  }
  end
    
  def update
    @asiento.fecha = newfecha
    @asiento.update
  end

  #Metodos que solo puedo usar en el controlador
  private

  # Método privado para encontrar un registro por su ID
  def asiento_find
    #@ es un variable que puedo usar en toda la instancia del controlador
    @asiento = Cont::AsientoContableUa.where(iddoc: params[:iddoc]).first
  end

  def documento_find
    @documento = Doc::DocumentoOrigen.where(iddoc: params[:iddoc]).first
  end

  def movimiento_contable_find
    @movimiento_contable = Cont::MovimientoContable.where(idasiento: @asiento.idasiento)
  end

  def lst_benef_activo
    @lst_benef_activo = Doc::VBenefActivo.select(:nombre, :numbenef, :letraid, :numid)
  end

  def lst_cta_publicacion
    @lst_cta_publicacion = Cont::CuentaPublicacion
      .select(:codcuenta, :desccuenta, :tipoauxiliar)
      .where(numpublicacion: params[:numpublicacion],  tipo: 'D')
  end

  def lst_cod_auxiliar
    @lst_cod_auxiliar = Cont::Auxiliar
      .select(:codauxiliar, :descauxiliar) 
      .where(tipoauxiliar: params[:tipoauxiliar], indactivo: 'D')
  end

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

  # Asiento
  def json_default_asiento
    %i[
      dsp_IndSisReg
    ]
  end

  # Solo Documento
  def json_default_documento
    %i[
      rifbenef
      nombrebenef
      dsp_desctipodoc
    ]
  end

  # Solo Documento
  def json_default_detasiento
    %i[
      dsp_DesCtaPub
      dsp_DescAuxiliar
      dsp_CuentaPadre
    ]
  end

  # Lista de Beneficiarios Activo
  def json_lst_benef_activo
    %i[
      rifbenefact
    ]
    end
end
