Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :sutras
      resources :photos
    end
  end
end
