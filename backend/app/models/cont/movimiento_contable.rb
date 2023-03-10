# Se define el módulo Cont
module Cont
    # Se define la clase AsientoContableUA que hereda de ApplicationRecord
    class MovimientoContable < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
        adapter: 'oracle_enhanced',
        encoding: 'utf8',
        database: '//keruxdb:1521/PREPROD',
        username: 'CONT',
        password: 'CONT$P'
        )

        # Se especifica el nombre de la tabla o vista de la base de datos a utilizar
        self.table_name = 'movimientos_contables'
        self.primary_key = [:idasiento, :nummov]
        
        # Asociaciones con otros modelos
        belongs_to :AsientoContable, foreign_key: "idasiento"
        belongs_to :AsientoContableUa, foreign_key: "idasiento"
        belongs_to :CuentaPublicacion, foreign_key: [:numpublicacion, :codcuenta]
        belongs_to :Auxiliar, foreign_key: [:tipoauxiliar, :codauxiliar]

        # Métodos del modelo
        # Método para mostrar la informacion de la cuenta de detalle
        # DescCuenta, Tipo, TipoAuxiliar, Nivel
        def dsp_CtaPub   
            if self.codcuenta != nil
                codcuenta = CuentaPublicacion.where(numpublicacion: self.numpublicacion, codcuenta: self.codcuenta, tipo: "D") 
            end
        end
        
        def dsp_CtaPub2   
            if self.codcuenta != nil
                self.CuentaPublicacion.where(tipo: 'D') 
            end
        end

        # Método obtener la descripcion del auxiliar
        def dsp_DescAuxiliar   
            if self.codauxiliar != nil
                self.Auxiliar.try(:descauxiliar)
            end
        end

        # Método obtener la descripcion del auxiliar
        def dsp_DescAux  
            if self.codauxiliar != nil
                aux = Auxiliar.where(tipoauxiliar: self.tipoauxiliar, codauxiliar: self.codauxiliar )
                aux.descauxiliar
            end
        end

        # Fin de la definición de la clase
    end
end
  