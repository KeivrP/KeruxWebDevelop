# Se define el módulo Cont
module Doc
     # Se define la clase AsientoContable que hereda de ApplicationRecord
    class DocumentoOrigen < ApplicationRecord
       #Se establece la conexión a la base de datos
        self.establish_connection(
          adapter: 'oracle_enhanced',
          encoding: 'utf8',
          database: '//keruxdb:1521/PREPROD',
          username: 'DOC',
          password: 'DOC$P'
        )
    
      # Configuración del archivo de configuración y otros atributos de modelo
      self.table_name = "documentos_origen"
      self.primary_key = "iddoc"
      
      # Atributo virtual para almacenar errores personalizados
      attr_accessor :error
  
      # Asociaciones con otros modelos
      belongs_to :tipodocumento, class_name: "TipoDocumento", primary_key: :tipodoc, foreign_key: "tipodoc"
      belongs_to :beneficiario, class_name: "Beneficiario", foreign_key: "numbenef"
      has_many :eventos, class_name: "EventoAdmonUa", foreign_key: "iddoc"
      has_many :eventosadmon, class_name: "EventoAdmon", foreign_key: "iddoc"
      has_many :docsteso, class_name: "Teso::DocTeso", foreign_key: "iddoc"
      has_many :asientos_contables, class_name: "Cont::AsientoContable", foreign_key: "iddoc"
  
      # Método para mostrar el origen del documento
      def dsp_origen
        if self.origen != nil
          plsql.proc_doc.nom_sis(self.origen)
        end
      end
  
      # Método para mostrar la moneda del documento
      def dsp_moneda
        plsql.proc_moneda.nommoneda(self.codmoneda)
      end
  
      # Método para obtener el último evento del documento
      def ultimo_evento
        plsql.proc_mensajero.busca_ult_evento(self.iddoc)
      end
  
      # Método para mostrar el tipo de documento
      def dsp_desctipodoc
        if self.tipodoc != nil
          plsql.proc_doc.nom_tipodoc(self.tipodoc)
        end
      end
  
      # Método para mostrar el nombre del sitio
      def nomsitio
        if self.codsitio != nil
          plsql.proc_moneda.nomsitio(self.codsitio)
        end
      end
  
      # Método para mostrar la moneda
      def moneda
        if self.codmoneda != nil
          plsql.proc_moneda.nommoneda(self.codmoneda)
        end
      end
  
      # Método para obtener el RIF del beneficiario
      def rifbenef
        benef = Beneficiario.find(self.numbenef)
        benef.letraid + "-" + benef.numid.to_s
      end
  
      # Método para mostrar el recorrido del documento
      def dsp_recorrido
        eventos = EventoAdmon.where(iddoc: self.iddoc)
        lazo = 1
        @recorrido = nil
  
        eventos.each do |evento|
          if lazo == 1
            @recorrido = evento.codsisgen + ' ' + evento.fecevento.to_s + '=>' + evento.codsisdest
            lazo = 0
          else
            if evento.tipoevento == 'DEV'
              @recorrido += evento.fecevento.to_s + '<-' + evento.codsisdest
            else
              @recorrido += evento.fecevento.to_s + '->' + evento.codsisdest
            end
          end
        end
        return @recorrido
      end

      # Definición del método dsp_docfin, que devuelve 'X' si el último evento de tipo FIN para un documento ha ocurrido.
      def dsp_docfin
        evento = EventoAdmon.find(EventoAdmon.where(iddoc: self.iddoc).maximum("idevento"))
        if evento.stsevento == 'FIN'
            'X'
        end
      end
  
      #  Definición del método tdt, que devuelve el número de días entre el primer evento y el último evento de un documento,
      # o el número de días entre el primer evento y el día actual si el documento no ha finalizado.
      def tdt
        eventos = EventoAdmon.where(iddoc: self.iddoc)
        lazo = 1
        finicio = nil
        ffin = nil
        ndias = 0
  
        eventos.each do |evento|
            if lazo == 1
            finicio = evento.fecevento
            lazo = 0
            else
             ffin = evento.fecevento
            end
        end
  
        documento = DocumentoOrigen.find(self.iddoc)
        if documento.stsdoc == 'FIN'
         ndias = ffin - finicio
          else
          ndias = (Time.now.to_date - finicio)
          ffin = Time.now.to_date
          end
  
        # Devolvemos un hash con los valores calculados
         resultado = { :ndias => ndias, :finicio => finicio, :ffi => ffin }
         resultado
      end
  
      # Definición del método tdht, que calcula las horas hábiles entre el primer evento y el último evento de un documento.
      def tdht
         resultado = tdt
        horas = plsql.proc_loc.calc_hrs_hab(resultado[:ffinicio], resultado[:ffin])
        tdht = plsql.proc_loc.mostrar_tiempo(horas)
        tdht
      end
      # Fin de la definición de la clase
    end
  end