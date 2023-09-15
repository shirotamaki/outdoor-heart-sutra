Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sutras, only: %i(index show)
      resources :photos, only: %i(index create show update destroy)
      resources :users, only: %i(index create show destroy) do
        resources :photos, only: %i(index), module: :users
      end
    end
  end
end
