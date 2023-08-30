# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'API' do
  describe 'V1' do
    describe 'Users', type: :request do
      let!(:user) { FactoryBot.create(:user) }

      describe 'GET /find_user' do
        context 'when user exists' do
          before { get '/api/v1/find_users', params: { email: user.email } }

          it "returns the user's ID" do
            expect(JSON.parse(response.body)['user_id']).to eq(user.id)
          end

          it 'returns status code 200' do
            expect(response).to have_http_status(:success)
          end
        end

        context 'when user does not exist' do
          before { get '/api/v1/find_users', params: { email: 'user-does-not-exist@example.com' } }

          it 'returns an error message' do
            expect(JSON.parse(response.body)).to have_key('error')
          end

          it 'returns status code 404' do
            expect(response).to have_http_status(:not_found)
          end
        end
      end

      describe 'POST /create' do
        let(:valid_attributes) do
          { provider: 'google', uid: '123456', name: 'Test User', email: 'test@example.com' }
        end

        context 'when the request is valid' do
          before { post '/api/v1/users', params: valid_attributes }

          it 'creates a user' do
            expect(response).to have_http_status(:success)
          end
        end

        context 'when the request is invalid' do
          before { post '/api/v1/users', params: { provider: '', uid: '', name: '', email: '' } }

          it 'returns status code 422' do
            expect(response).to have_http_status(:unprocessable_entity)
          end

          it 'returns a validation failure message' do
            expect(JSON.parse(response.body)).to have_key('error')
          end
        end
      end

      describe 'DELETE /destroy' do
        let(:non_existent_user_id) { 9999 }

        context 'when user exists' do
          before { delete "/api/v1/users/#{user.id}" }

          it 'destroys the user' do
            expect(response).to have_http_status(:no_content)
          end

          it 'removes the user from the database' do
            expect(User.find_by(id: user.id)).to be_nil
          end
        end

        context 'when user does not exist' do
          before { delete "/api/v1/users/#{non_existent_user_id}" }

          it 'returns status code 404' do
            expect(response).to have_http_status(:not_found)
          end

          it 'returns a not found message' do
            expect(JSON.parse(response.body)).to have_key('error')
          end
        end
      end
    end
  end
end
