Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      resources :sutras, only: [:index, :show]
      resources :photos
    end
  end
  delete "users/:email", to: "api/v1/users#destroy", constraints: { email: /[^\/]+/ }
end
