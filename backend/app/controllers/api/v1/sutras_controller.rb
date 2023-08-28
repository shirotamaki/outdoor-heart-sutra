# frozen_string_literal: true

module API
  module V1
    class SutrasController < ApplicationController
      def index
        sutras = Sutra.all
        render json: sutras
      end

      def show
        sutra = Sutra.find(params[:id])
        render json: sutra
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      end
    end
  end
end
