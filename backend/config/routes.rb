Rails.application.routes.draw do
  mount ActionCable.server, at: "/cable"
  namespace :cont do
    resources :asientos_contables, only: [:index]
  end
end
