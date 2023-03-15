Rails.application.routes.draw do
  mount ActionCable.server, at: "/cable"
  namespace :cont do
    resources :asientos_contables, only: [:index]
    scope :asientos_contables do
      get "show", to: "asientos_contables#show"
      get "show_prueba", to: "asientos_contables#show_prueba"
    end
  end
end
