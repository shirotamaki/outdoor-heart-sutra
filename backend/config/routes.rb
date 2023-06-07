Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      get 'users/find', to: 'users#find_user'
      resources :sutras, only: [:index, :show]
      get "photos/find", to: "photos#find_photo_by_sutra_and_user"
      resources :photos, only: [:create, :show, :update, :destroy]
      get 'users/:user_id/photos', to: 'photos#index_by_user'
    end
  end
  delete "users/:email", to: "api/v1/users#destroy", constraints: { email: /[^\/]+/ }
end
