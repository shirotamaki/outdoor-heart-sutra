Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      get 'users/find', to: 'users#find_user'
      resources :sutras, only: [:index, :show]
      resources :photos, only: [:create]
    end
  end
  delete "users/:email", to: "api/v1/users#destroy", constraints: { email: /[^\/]+/ }
end
