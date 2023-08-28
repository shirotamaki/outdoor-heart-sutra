# frozen_string_literal: true

require 'image_processing/vips'

module API
  module V1
    class PhotosController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :set_photo, only: %i[show update destroy]

      def find_photo_by_sutra_and_user
        photo = Photo.find_by(sutra_id: params[:sutraId], user_id: params[:userId])
        if photo
          render json: { photo_id: photo.id }, status: :ok
        else
          render json: { error: '写真が見つかりませんでした' }, status: :not_found
        end
      end

      def index_by_user
        user = User.find_by(id: params[:user_id])

        if user.nil?
          render json: { error: 'ユーザーが見つかりません' }, status: :not_found
        else
          photos = user.photos.map do |photo|
            image_url = rails_blob_url(photo.image) if photo.image.attached?
            cropped_image_url = rails_blob_url(photo.cropped_image) if photo.cropped_image.attached?

            photo.as_json.merge(image_url:, cropped_image_url:)
          end
          render json: photos
        end
      end

      def create
        photo = Photo.new(photo_params)
        photo.image.attach(convert_to_webp(params[:image])) if params[:image]
        photo.cropped_image.attach(convert_to_webp(params[:croppedImage])) if params[:croppedImage]

        if photo.save
          head :ok
        else
          render json: { error: '保存に失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: '保存に失敗しました', errors: e.message }, status: :internal_server_error
      end

      def show
        image_url = rails_blob_url(@photo.image) if @photo.image.attached?
        cropped_image_url = rails_blob_url(@photo.cropped_image) if @photo.cropped_image.attached?
        render json: @photo.as_json.merge(image_url:, cropped_image_url:)
      end

      def update
        if @photo.update(photo_params)
          @photo.image.attach(convert_to_webp(params[:image])) if params[:image]
          @photo.cropped_image.attach(convert_to_webp(params[:croppedImage])) if params[:croppedImage]

          head :ok
        else
          render json: { error: '更新に失敗しました' }, status: :unprocessable_entity
        end
      rescue StandardError => e
        render json: { error: '更新に失敗しました', details: e.message }, status: :internal_server_error
      end

      def destroy
        @photo.image.purge if @photo.image.attached?
        @photo.cropped_image.purge if @photo.cropped_image.attached?

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
          note: params[:noteData],
          latitude: params[:latitudeData],
          longitude: params[:longitudeData],
          address: params[:addressData],
          user_id: params[:currentUserId],
          sutra_id: params[:currentSutraId]
        }.compact
      end

      def convert_to_webp(image)
        webp_image = ImageProcessing::Vips.source(image).convert('webp').call

        ActionDispatch::Http::UploadedFile.new(
          tempfile: webp_image,
          filename: "#{image.original_filename.split('.').first}.webp",
          original_filename: "#{image.original_filename.split('.').first}.webp",
          content_type: 'image/webp'
        )
      end
    end
  end
end
