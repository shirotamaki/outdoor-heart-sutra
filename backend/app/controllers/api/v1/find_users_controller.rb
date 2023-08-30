# frozen_string_literal: true

module API
  module V1
    class FindUsersController < ApplicationController
      def index
        user = User.find_by(email: params[:email])
        
        if user
          render json: { user_id: user.id }, status: :ok
        else
          render json: { error: "ユーザーが見つかりませんでした" }, status: :not_found
        end
      end
    end
  end
end
