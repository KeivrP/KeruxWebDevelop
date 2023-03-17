module MetodoGlobal
    extend ActiveSupport::Concern

    # Método para obtener el RIF del beneficiario
    def rifbenef
        benef = Doc::Beneficiario.find(self.numbenef)
        benef.letraid + "-" + benef.numid.to_s
    end

    # Método para obtener el RIF del beneficiario Activo
    def rifbenefact
        benef = Doc::VBenefActivo.find(self.numbenef)
        benef.letraid + "-" + benef.numid.to_s
    end

    # Método para obtener nombre del beneficiario
    def dsp_nombrebenef
        nombre = Doc::Beneficiario.find(self.numbenef)
        nombre.nombre
    end
    # Método para mostrar la moneda del documento
    def desc_moneda
        if self.codmoneda != nil
            moneda = Kentron::Moneda.find(self.codmoneda)
            moneda.nommoneda
        end
    end
end