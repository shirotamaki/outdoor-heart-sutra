# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      # create, destroyアクションに対して、CSRF保護を無効にする
      skip_before_action :verify_authenticity_token, only: %i[create destroy]

      def create
        # 引数の条件に該当するデータがあればそれを返す。なければ新規作成する
        user = User.find_or_create_by(provider: params[:provider], uid: params[:uid], name: params[:name], email: params[:email])
        if user
          head :ok
        else
          render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      def destroy
        user = User.find_by(email: params[:email])
        if user
          user.destroy
        else
          render json: { error: 'ユーザーが見つかりませんでした' }, status: :not_found
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end
