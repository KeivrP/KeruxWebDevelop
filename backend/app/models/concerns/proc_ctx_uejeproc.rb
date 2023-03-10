module ProcCtxUejeproc
    extend ActiveSupport::Concern

    # Método SET_UNDADMPRO Establece la unidad ejecutora en proceso
    def set_UndAdmPro
        vCodUndPro = Kentron::KntUsuarioKerux.find(self.codusuario)
        vCodUndPro.CodUAdmProBand || "*"
        Rails.application.config.gcodundpro = vCodUndPro.CodUAdmProBand
        
    end

    # Método GET_UNDADMPRO Retorna el código de la de la unidad ejecutora en proceso
    def get_UndAdmPro
        if Rails.application.config.gcodundpro != nil
            vCodUndPro = Kentron::KntUsuarioKerux.find(self.codusuario)
        else
            Rails.application.config.gcodundpro
        end
    end

end