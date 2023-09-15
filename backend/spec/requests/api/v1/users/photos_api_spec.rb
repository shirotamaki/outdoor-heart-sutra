# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'API' do
  describe 'V1' do
    describe 'Users' do
      describe 'Photos', type: :request do
        let!(:user) { FactoryBot.create(:user) }

        describe 'GET /api/v1/users/:id/photos' do
          before do
            get "/api/v1/users/#{user.id}/photos"
          end

          it 'returns status code 200' do
            expect(response).to have_http_status(:success)
          end

          it 'returns the photos of the user' do
            expect(JSON.parse(response.body).size).to eq(user.photos.count)
          end
        end
      end
    end
  end
end
