module MetodoGlobal
    extend ActiveSupport::Concern

    # Método para obtener el RIF del beneficiario
    def rifbenef
        benef = Doc::Beneficiario.find(self.numbenef)
        benef.letraid + "-" + benef.numid.to_s
    end

    # Método para obtener el RIF del beneficiario Activo
    def rifbenefAct
        benef = Doc::VBenefActivo.find(self.numbenef)
        benef.letraid + "-" + benef.numid.to_s
    end

    # Método para mostrar la moneda del documento
    def desc_moneda
        if self.codmoneda != nil
            moneda = Kentron::Moneda.find(self.codmoneda)
            moneda.nommoneda
        end
    end

    # Método para mostrar nombre del beneficiario del documento
    def dsp_nombre
        if self.numbenef != nil
           nombre = Doc::Beneficiario.find(self.numbenef)
        end
    end
end