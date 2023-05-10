# frozen_string_literal: true

module Api
  module V1
    class PhotosController < ApplicationController
      skip_before_action :verify_authenticity_token

      def find_photo
        photo = Photo.find_by(sutra_id: params[:sutraId], user_id: params[:userId])
        if photo
          render json: { photo_id: photo.id }
        else
          render json: { error: "ユーザーが見つかりませんでした" }, status: :not_found
        end
      end

      def create
        photo = Photo.create(
          photo_data: params[:photoData],
          note: params[:note],
          latitude: params[:latitudeData],
          longitude: params[:longitudeData],
          address: params[:addressData],
          user_id: params[:currentUserId],
          sutra_id: params[:currentSutraId],
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
        update_params = params.permit(:photoData, :note, :latitudeData, :longitudeData, :addressData).to_h.compact
        if photo.update(update_params)
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
          head :ok
        else
          render json: { error: "photoが見つかりませんでした" }, status: :not_found
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end
