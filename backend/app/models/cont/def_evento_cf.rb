# Se define el módulo Cont
module Cont
    # Se define la clase DefEventoCf que hereda de ApplicationRecord
    class ControlCf < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
            adapter: 'oracle_enhanced',
            encoding: 'utf8',
            database: '//keruxdb:1521/PREPROD',
            username: 'CONT',
            password: 'CONT$P'
        )
    
        # Se especifica el nombre de la tabla de la base de datos a utilizar
        self.table_name = 'def_evento_cf'
        self.primary_key = [:tipodoc, :codsisaprob, :tipoevento, :numpublicacion, :numasiento, :tipoasiento]

        # Asociaciones con otros modelos
        belongs_to :Publicacion, foreign_key: "numpublicacion"
        belongs_to :TipoDocumento, class_name: 'Doc::TipoDocumento', foreign_key: 'tipodoc'
        belongs_to :AsientoModelo, foreign_key: [:numpublicacion, :numasiento, :tipoasiento]
        
        # Métodos del modelo

        # Fin de la definición de la clase
    end
  end
  