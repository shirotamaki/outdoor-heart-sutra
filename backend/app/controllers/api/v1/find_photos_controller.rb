# frozen_string_literal: true

module API
  module V1
    class FindPhotosController < ApplicationController
      def index
        photo = Photo.find_by(sutra_id: params[:sutraId], user_id: params[:userId])
        
        if photo
          render json: { photo_id: photo.id }, status: :ok
        else
          render json: { error: "写真が見つかりませんでした" }, status: :not_found
        end
      end
    end
  end
end
