# frozen_string_literal: true

module Api
  module V1
    class PhotosController < ApplicationController
      skip_before_action :verify_authenticity_token

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
    end
  end
end
