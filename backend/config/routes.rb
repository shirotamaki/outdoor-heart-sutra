Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show]
      get 'users/find', to: 'users#find_user'
      delete "users/:email", to: "users#destroy", constraints: { email: /[^\/]+/ }

      resources :sutras, only: [:index, :show]

      resources :photos, only: [:create, :show, :update, :destroy]
      get "photos/find", to: "photos#find_photo_by_sutra_and_user"
      get 'users/:user_id/photos', to: 'photos#index_by_user'
    end
  end
end
