# frozen_string_literal: true

module API
  module V1
    class UsersController < ApplicationController
      # create, destroyアクションに対して、CSRF保護を無効にする
      skip_before_action :verify_authenticity_token, only: %i[create destroy]

      def find_user
        user = User.find_by(email: params[:email])
        if user
          render json: { user_id: user.id }, status: :ok
        else
          render json: { error: 'ユーザーが見つかりませんでした' }, status: :not_found
        end
      end

      def create
        user = User.find_by(provider: params[:provider], uid: params[:uid])
        if user.nil?
          user = User.create(provider: params[:provider], uid: params[:uid], name: params[:name], email: params[:email])
          unless user.valid?
            render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
            return
          end
        end
        head :ok
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
        user = User.find_by(email: params[:email])
        if user
          user.destroy
          head :no_content
        else
          render json: { error: 'ユーザーが見つかりませんでした' }, status: :not_found
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end
