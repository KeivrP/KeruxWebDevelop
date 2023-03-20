# Se define el módulo Cont
module Doc
  # Se define la clase AsientoContable que hereda de ApplicationRecord
  class DocumentoOrigen < ApplicationRecord
    #Se establece la conexión a la base de datos
    self.establish_connection(
      adapter: "oracle_enhanced",
      encoding: "utf8",
      database: "//keruxdb:1521/PREPROD",
      username: 'ROBERTO',
      password: 'ROBERTO$P'
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
    belongs_to :MonedaSitio, class_name: "Kentron::MonedaSitio", foreign_key: [ :codsitio, :codmoneda]
    belongs_to :MonedaSitioMtoDoc, class_name: "Kentron::MonedaSitio", foreign_key: [ :codsitio, :codmonedamtodoc]
    has_many :Sitio, through: :MonedaSitio
    has_many :Moneda, through: :MonedaSitio

    has_many :EventoAdmonUa, foreign_key: "iddoc"
    has_many :EventoAdmon, foreign_key: "iddoc"
    # Self joins
    #has_many   :iddoc, class_name: "DocumentoOrigen", foreign_key: "iddoc"
    #belongs_to :iddocref,  class_name: "DocumentoOrigen", foreign_key: "iddocref"
    #belongs_to :iddoctransf,  class_name: "DocumentoOrigen", foreign_key: "iddoctransf"
    #belongs_to :iddocorigtransf,  class_name: "DocumentoOrigen", foreign_key: "iddocorigtransf"

    # Métodos del modelo
    # Método para mostrar el tipo de documento
    def dsp_desctipodoc
      #self.TipoDocumento.try(:desctipodoc)
      tipodoc = Doc::TipoDocumento.select(:tipodoc, :desctipodoc, :tipodocref, :indrefdoc).where(tipodoc: self.tipodoc).first
    end

    #Validaciones
    validates :numbenef, :tipodoc, :descdoc, :refdoc, :ano, :fecdoc, :codsitio, :codmoneda, :montoorig, presence: true

    # Fin de la definición de la clase
  end
end
