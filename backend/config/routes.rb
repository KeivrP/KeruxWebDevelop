Rails.application.routes.draw do
  mount ActionCable.server, at: "/cable"
  namespace :cont do
    resources :asientos_contables, only: [:index]
    scope :asientos_contables do
      get "show", to: "asientos_contables#show"
      post "update", to: "asientos_contables#update"
      post "update_movimiento", to: "asientos_contables#update_movimiento"
      post "delete_movimiento", to: "asientos_contables#delete_movimiento"
      get "boton_validar", to: "asientos_contables#boton_validar"
      get "beneficiario", to: "asientos_contables#lst_benefat"
      get "cuentaspub", to: "asientos_contables#lst_cta_pub"
      get "listauxiar", to: "asientos_contables#lst_cod_axu"
      get "codauxiliares", to: "asientos_contables#lst_tip_doc_cont"
    end
  end
end
