Rails.application.routes.draw do
  mount ActionCable.server, at: "/cable"
  namespace :cont do
    resources :asientos_contables, only: [:index]
    scope :asientos_contables do
      get "show", to: "asientos_contables#show"
      post "update", to: "asientos_contables#update"
    end
  end
end
