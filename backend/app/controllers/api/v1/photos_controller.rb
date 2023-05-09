# frozen_string_literal: true

module Api
  module V1
    class PhotosController < ApplicationController
      skip_before_action :verify_authenticity_token

      def find_photo
        photo = Photo.find_by(sutra_id: params[:sutra_id], user_id: params[:user_id])
        if photo
          render json: { photo_id: photo.id }
        else
          render json: { error: "ユーザーが見つかりませんでした" }, status: :not_found
        end
      end

      def create
        photo = Photo.create(
          photo_data: params[:photo_data],
          note: params[:note],
          latitude: params[:latitude_data],
          longitude: params[:longitude_data],
          address: params[:address_data],
          user_id: params[:current_user_id],
          sutra_id: params[:current_sutra_id],
        )
        if photo
          head :ok
        else
          render json: { error: "保存に失敗しました" }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: "保存に失敗しました", errors: photo.errors }, status: :internal_server_error
      end

      def show
        begin
          photo = Photo.find(params[:id])
          render json: photo
        rescue ActiveRecord::RecordNotFound => e
          render json: { error: e.message }, status: :not_found
        end
      end

      def update
        photo = Photo.find(params[:id])
        if photo.update(note: params[:note])
          head :ok
        else
          render json: { error: "更新に失敗しました" }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      def destroy
        photo = Photo.find(params[:id])
        if photo
          photo.destroy
        else
          render json: { error: "photoが見つかりませんでした" }, status: :not_found
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end
