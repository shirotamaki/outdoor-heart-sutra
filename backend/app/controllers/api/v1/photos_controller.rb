# frozen_string_literal: true

module Api
  module V1
    class PhotosController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_photo, only: %i[show update destroy]

      def find_photo
        photo = Photo.find_by(sutra_id: params[:sutraId], user_id: params[:userId])
        if photo
          render json: { photo_id: photo.id }
        else
          render json: { error: '写真が見つかりませんでした' }, status: :not_found
        end
      end

      def index_by_user
        user = User.find(params[:user_id])
        render json: user.photos
      end

      def create
        photo = Photo.new(photo_params)
        if photo.save
          head :ok
        else
          render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: '保存に失敗しました', errors: e.message }, status: :internal_server_error
      end

      def show
        render json: @photo
      end

      def update
        if @photo.update(photo_params)
          head :ok
        else
          render json: { error: '更新に失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: '更新に失敗しました', details: e.message }, status: :internal_server_error
      end

      def destroy
        @photo.destroy
        head :no_content
      rescue StandardError => e
        render json: { error: '削除に失敗しました', details: e.message }, status: :internal_server_error
      end

      private

      def set_photo
        @photo = Photo.find(params[:id])
      end

      def photo_params
        {
          image_url: params[:imageUrl],
          cropped_image_url: params[:croppedImageUrl],
          note: params[:noteData],
          latitude: params[:latitudeData],
          longitude: params[:longitudeData],
          address: params[:addressData],
          user_id: params[:currentUserId],
          sutra_id: params[:currentSutraId]
        }.compact
      end
    end
  end
end
