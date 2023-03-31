# frozen_string_literal: true

module Api
  module V1
    class SutrasController < ApplicationController
      def index
        sutras = Sutra.all
        render json: sutras
      end

      def show; end

      def new; end

      def create; end

      def edit; end

      def update; end

      def destroy; end
    end
  end
end
