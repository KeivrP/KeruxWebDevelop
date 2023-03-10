# Se define el módulo Cont
module Cont
  # Se define la clase AsientoContable que hereda de ApplicationRecord
  class Cont::AsientoContable < ApplicationRecord
    # Se establece la conexión a la base de datos
    self.establish_connection(
      adapter: "oracle_enhanced",
      encoding: "utf8",
      database: "//keruxdb:1521/PREPROD",
      username: "CONT",
      password: "CONT$P",
    )

    # Se especifica el nombre de la tabla de la base de datos a utilizar
    self.table_name = "asientos_contables"
    self.primary_key = "idasiento"

    # Asociaciones con otros modelos
    belongs_to :Publicacion, foreign_key: "numpublicacion"
    #necesitamos asegurar de que la relación DocumentoOrigen
    #siempre esté presente, incluso si el AsientoContable actual no tiene ningún DocumentoOrigen asociado.
    #para hacer eso agregamos  el parametro optional: true
    belongs_to :DocumentoOrigen, class_name: "Doc::DocumentoOrigen", foreign_key: "iddoc", optional: true
    has_many :MovimientoContable, foreign_key: "idasiento"

    # Métodos del modelo
    # Método para mostrar la referencia del documento
    def dsp_RefDoc
      #asociamos la instancia con un self para que tome la relacion ya que se trabaja con modulos
      self.DocumentoOrigen.try(:refdoc)
      #documento = self.DocumentoOrigen
      #se utiliza el operador ternario (?) para comprobar si se obtuvo
      #un objeto DocumentoOrigen. Si se obtuvo, se devuelve el valor de su atributo
      #documento ? documento.refdoc : "Sin referencia de documento"
    end

    # Fin de la definición de la clase
  end
end
