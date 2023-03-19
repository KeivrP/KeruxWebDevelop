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
    end
  end
end
