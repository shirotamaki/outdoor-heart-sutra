Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :sutras
      resources :photos
    end
  end
  post 'auth/:provider/callback', to: 'api/v1/users#create'
  delete "users/:email", to: "api/v1/users#destroy", constraints: { email: /[^\/]+/ }
end
