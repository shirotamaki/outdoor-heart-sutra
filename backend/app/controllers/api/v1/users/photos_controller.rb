# frozen_string_literal: true

module API
  module V1
    module Users
      class PhotosController < ApplicationController
        def index
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
      end
    end
  end
end
