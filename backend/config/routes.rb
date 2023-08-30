Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :find_photos, only: [:index]
      resources :find_users, only: [:index]

      get 'users/:id/photos', to: 'photos#index'
      resources :photos, only: [:create, :show, :update, :destroy]
      resources :sutras, only: [:index, :show]
      resources :users, only: [:create, :show, :destroy]
    end
  end
end
