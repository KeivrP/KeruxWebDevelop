# Controlador para la tabla Asientos Contables en el namespace Cont
class Cont::AsientosContablesController < ApplicationController
  before_action :asiento_find, only: [:show]

  # Acción index para listar los registros de la tabla
  def index
    # Seleccionar los campos deseados de la tabla y paginar el resultado
    asiento = Cont::AsientoContableUa
      .select(:iddoc, :descasiento, :refdoc, :anocont, :percont, :fecasiento, :numpublicacion, :stsasiento)
      .where(stsasiento: ["REC", "RCH"])
      .page(params[:page])
      .per(10)
    # Renderizar los resultados como JSON, incluyendo los métodos por defecto
    render json: asiento.as_json #(methods: json_default_methods)
  end

  # Acción show para mostrar un registro específico de la tabla
  def show
    # Renderizar el registro encontrado como JSON, incluyendo los métodos por defecto
    render json: @asiento.as_json #(methods: json_default_methods)
  end

  def update
    @asiento.fechar = newfecha
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
    @documento = Doc::DocumentoOrigen.find(iddocparams[:iddoc])
  end

  # Definir los métodos por defecto a incluir en el resultado JSON
  def json_default_methods
    %i[
      dsp_FecRef,
      dsp_CodSisReg,
    ]
  end
end
