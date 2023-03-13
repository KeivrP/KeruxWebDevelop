# Se define el módulo Cont
module Doc
  # Se define la clase AsientoContable que hereda de ApplicationRecord
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
    belongs_to :VBenefActivo, foreign_key: "numbenef"
    belongs_to :Moneda, class_name: "Kentron::Moneda", foreign_key: "codmoneda"
    belongs_to :Sitio, class_name: "Kentron::Sitio", foreign_key: "codsitio"
    belongs_to :MonedaSitio, class_name: "Kentron::MonedaSitio", foreign_key: [:codmoneda, :codsitio]
    has_many :Sitio, through: :MonedaSitio

    has_many :EventoAdmonUa, foreign_key: "iddoc"
    has_many :EventoAdmon, foreign_key: "iddoc"
    # Self joins
    has_many   :iddocref, class_name: "DocumentoOrigen", foreign_key: "iddoc"
    has_many   :iddocorigtransf, class_name: "DocumentoOrigen", foreign_key: "iddoc"
    has_many   :iddoctransf, class_name: "DocumentoOrigen", foreign_key: "iddoc"
    belongs_to :iddoc, class_name: "DocumentoOrigen", optional: true

    # Métodos del modelo
    # Método para mostrar el tipo de documento
    def dsp_desctipodoc
      self.TipoDocumento.try(:desctipodoc)
    end

    # Fin de la definición de la clase
  end
end
