Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      # Public — GET /buildings (?q= &limit=)
      resources :buildings, only: %i[index show]

      # Admin — Bearer token (ADMIN_SECRET_TOKEN), see Api::V1::Admin::BaseController
      namespace :admin do
        resources :buildings
      end
    end
  end
end
