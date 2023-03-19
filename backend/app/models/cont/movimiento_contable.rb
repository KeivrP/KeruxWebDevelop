# Se define el módulo Cont
module Cont
    # Se define la clase AsientoContableUA que hereda de ApplicationRecord
    class MovimientoContable < ApplicationRecord
        # Se establece la conexión a la base de datos
        self.establish_connection(
        adapter: 'oracle_enhanced',
        encoding: 'utf8',
        database: '//keruxdb:1521/PREPROD',
        username: 'ROBERTO',
        password: 'ROBERTO$P'
        )

        # Se especifica el nombre de la tabla o vista de la base de datos a utilizar
        self.table_name = 'movimientos_contables'
        self.primary_key = [:idasiento, :nummov]
        
        # Asociaciones con otros modelos
        belongs_to :AsientoContable, foreign_key: "idasiento"
        #belongs_to :AsientoContableUa, foreign_key: "idasiento"
        belongs_to :CuentaPublicacion, foreign_key: [:numpublicacion, :codcuenta]
        belongs_to :Auxiliar, foreign_key: [:tipoauxiliar, :codauxiliar], optional: true

        # Métodos del modelo
        # Método para mostrar la informacion de la cuenta de detalle
        # DescCuenta
        def dsp_DesCtaPub   
            if self.codcuenta != nil
                #codcuenta = CuentaPublicacion.where(numpublicacion: self.numpublicacion, codcuenta: self.codcuenta, tipo: "D").pluck(:desccuenta, :tipo, :nivel, :tipoauxiliar).first
                codcuenta = CuentaPublicacion.select(:desccuenta).where(numpublicacion: self.numpublicacion, codcuenta: self.codcuenta, tipo: "D").first
                codcuenta.desccuenta
            end
        end

        # Método obtener la descripcion del auxiliar
        def dsp_DescAuxiliar   
            if self.codauxiliar != nil
                self.Auxiliar.try(:descauxiliar)
            end
        end

        # Método obtener la descripcion de la cuenta padre
        def dsp_CuentaPadre
            if  self.numpublicacion != nil && self.codcuenta != nil

                # Obtiene el código de estructura de la publicación
                codestruct = Cont::Publicacion.where(numpublicacion: self.numpublicacion).pluck(:codestruct).first

                # Obtiene el nivel de la cuenta a buscar
                nNivel = Cont::CuentaPublicacion.select(:nivel).where(numpublicacion: self.numpublicacion, codcuenta: self.codcuenta).first.nivel
                                
                if nNivel > 1 # Si la cuenta a buscar tiene un nivel mayor que 1       
                    # Obtiene el máximo número de dígitos acumulados en la estructura        
                    nDigMax = Cont::NivelCuenta.where(codestruct: codestruct).maximum(:digacum)
                    
                    # Obtiene el número de dígitos anteriores en el nivel actual de la cuenta
                    nDigitos = Cont::NivelCuenta.select(:diganterior).where(nivel: nNivel, codestruct: codestruct).first.diganterior
                    
                    # Formatea el código de cuenta para que tenga nDigMax dígitos y coge sólo los nDigitos anteriores
                    cCuenta = self.codcuenta.to_s[0, nDigitos].ljust(nDigMax, "0")
                    
                    # Obtiene la descripción de la cuenta
                    cDescPadre = Cont::CuentaPublicacion.select(:desccuenta).where(numpublicacion: self.numpublicacion, codcuenta: cCuenta).first.desccuenta 
                end
            end
        end
    end # Fin de la definición de la clase
end
  