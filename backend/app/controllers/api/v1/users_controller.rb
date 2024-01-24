# frozen_string_literal: true

module API
  module V1
    class UsersController < ApplicationController
      # create, destroyアクションに対して、CSRF保護を無効にする
      skip_before_action :verify_authenticity_token, only: %i[create destroy]

      def index
        user = User.find_by(email: params[:email])

        if user
          render json: { user_id: user.id }, status: :ok
        else
          render json: { error: 'ユーザーが見つかりませんでした' }, status: :not_found
        end
      end

      def create
        user = User.find_or_create_by(user_params) do |new_user|
          new_user.name = params[:name]
          new_user.email = params[:email]
        end

        if user.persisted?
          render json: user, status: :ok
        else
          render json: { error: 'ユーザの作成に失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      def show
        user = User.find(params[:id])
        render json: user
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      end

      def destroy
        user = User.find_by(id: params[:id])

        if user
          user.destroy
          head :no_content
        else
          render json: { error: 'ユーザーが見つかりませんでした' }, status: :not_found
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:provider, :uid, :name, :email)
      end
    end
  end
end
