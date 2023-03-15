# Se define el módulo Cont
module Cont
    # Se define la clase AsientoContableUA que hereda de ApplicationRecord
    class AsientoContableUa < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
        adapter: 'oracle_enhanced',
        encoding: 'utf8',
        database: '//keruxdb:1521/PREPROD',
        username: 'CONT',
        password: 'CONT$P'
        )

        # Se especifica el nombre de la tabla o vista de la base de datos a utilizar
        self.table_name = 'asientos_contables_ua'
        
        # Asociaciones con otros modelos
        belongs_to :Publicacion, foreign_key: "numpublicacion"
        belongs_to :DocumentoOrigen, class_name: 'Doc::DocumentoOrigen', foreign_key: 'iddoc'
        has_many :MovimientoContable, foreign_key: "idasiento"
        
        # Métodos del modelo
        # Método para mostrar la referencia del documento
        def dsp_FecRef
            #asociamos la instancia con un self para que tome la relacion ya que se trabaja con modulos
            self.DocumentoOrigen.try(:fecref)
        end

        # Método para mostrar el codigo de sistema que registra
        def dsp_CodSisReg
            #asociamos la instancia con un self para que tome la relacion ya que se trabaja con modulos
            self.DocumentoOrigen.try(:codsisreg)
        end

        # Método para mostrar el codigo de sistema que registra
        def dsp_IndSisReg
            #asociamos la instancia con un self para que tome la relacion ya que se trabaja con modulos
            controcf = ControlCf.first
            controcf.indsisreg
        end

        # Método para mostrar el monto del documento
        def dsp_MtoDoc
            #asociamos la instancia con un self para que tome la relacion ya que se trabaja con modulos
            self.DocumentoOrigen.try(:mtodoc)
        end
        # Fin de la definición de la clase
    end
  end
  