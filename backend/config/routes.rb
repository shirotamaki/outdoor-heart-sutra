Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sutras, only: %i(index show)
      resources :photos, only: %i(index create show update destroy)

      resources :users, only: %i(index create show destroy) do
        # 特定のuserが持つ全てのphotoを取得する場合： /api/v1/users/:user_id/photos
        resources :photos, only: %i(index)
      end
    end
  end
end
