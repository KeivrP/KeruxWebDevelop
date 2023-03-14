# Se define el módulo Cont
module Doc
  # Se define la clase DocumentoOrigen que hereda de ApplicationRecord
  class DocumentoOrigen < ApplicationRecord
    #Se establece la conexión a la base de datos
    self.establish_connection(
      adapter: "oracle_enhanced",
      encoding: "utf8",
      database: "//keruxdb:1521/PREPROD",
      username: "DOC",
      password: "DOC$P",
    )

    include MetodoGlobal

    # Configuración del archivo de configuración y otros atributos de  modelo
    self.table_name = "documentos_origen"
    self.primary_key = "iddoc"

    # Atributo virtual para almacenar errores personalizados
    attr_accessor :error

    # Asociaciones con otros modelos
    has_many :AsientoContable, class_name: "Cont::AsientoContable", foreign_key: "iddoc"
    belongs_to :TipoDocumento, foreign_key: "tipodoc"
    belongs_to :Beneficiario, foreign_key: "numbenef"
    belongs_to :Moneda, class_name: "Kentron::Moneda", foreign_key: "codmoneda"
    belongs_to :TipoCambio, class_name: "Kentron::TipoCambio", foreign_key: "codmoneda"
    has_many :EventoAdmonUa, foreign_key: "iddoc"
    has_many :EventoAdmon, foreign_key: "iddoc"

    # Métodos del modeloa
    # Método para mostrar el tipo de documento
    def dsp_desctipodoc
      self.TipoDocumento.try(:desctipodoc)
    end
    # Fin de la definición de la clase
  end
end

