Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :sutras
      resources :photos
    end
  end
  post 'auth/:provider/callback', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end
