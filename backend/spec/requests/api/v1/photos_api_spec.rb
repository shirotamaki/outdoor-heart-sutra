# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Photos', type: :request do
  let!(:user) { FactoryBot.create(:user) }
  let!(:sutra) { FactoryBot.create(:sutra) }
  let!(:photo) { FactoryBot.create(:photo, user:, sutra:) }

  let(:valid_attributes) do
    {
      noteData: 'Test Note',
      latitudeData: '35.693539069879535',
      longitudeData: '139.74961104672445',
      addressData: 'Tokyo, Japan',
      currentUserId: user.id,
      currentSutraId: sutra.id
    }
  end

  let(:invalid_attributes) do
    {
      noteData: 'a' * 257,
      latitudeData: nil,
      longitudeData: nil,
      addressData: nil,
      currentUserId: nil,
      currentSutraId: nil
    }
  end

  let(:valid_headers) do
    {}
  end

  # find_photo_by_sutra_and_user
  describe 'GET /api/v1/photos/find' do
    before do
      get '/api/v1/photos/find', params: { sutraId: sutra.id, userId: user.id }
    end

    context 'when photo exists' do
      it 'returns the photo ID' do
        expect(JSON.parse(response.body)['photo_id']).to eq(photo.id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'when photo does not exist' do
      let!(:other_user) { FactoryBot.create(:user) }
      let!(:other_sutra) { FactoryBot.create(:sutra) }

      before do
        get '/api/v1/photos/find', params: { sutraId: other_sutra.id, userId: other_user.id }
      end

      it 'returns an error message' do
        expect(JSON.parse(response.body)['error']).to eq('写真が見つかりませんでした')
      end

      it 'returns status code 404' do
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  # index_by_user
  describe 'GET /api/v1/users/:user_id/photos' do
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

  # create
  describe 'POST /api/v1/photos' do
    context 'with valid parameters' do
      it 'creates a new photo' do
        expect do
          post '/api/v1/photos', params: valid_attributes, headers: valid_headers, as: :json
        end.to change(Photo, :count).by(1)
      end

      it 'renders a successful response' do
        post '/api/v1/photos', params: valid_attributes, headers: valid_headers, as: :json
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new photo' do
        expect do
          post '/api/v1/photos', params: invalid_attributes, headers: valid_headers, as: :json
        end.to change(Photo, :count).by(0)
      end

      it 'renders a JSON response with errors for the new photo' do
        post '/api/v1/photos', params: invalid_attributes, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  # show
  describe 'GET /api/v1/photos/:id' do
    before do
      get "/api/v1/photos/#{photo.id}"
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the photo' do
      expect(JSON.parse(response.body)['id']).to eq(photo.id)
    end
  end

  # update
  describe 'PATCH /api/v1/photos/:id' do
    context 'with valid parameters' do
      before do
        patch "/api/v1/photos/#{photo.id}", params: valid_attributes, headers: valid_headers, as: :json
        photo.reload
      end

      it 'updates the photo' do
        expect(photo.note).to eq('Test Note')
        expect(photo.latitude).to eq(35.693539069879535)
        expect(photo.longitude).to eq(139.74961104672445)
        expect(photo.address).to eq('Tokyo, Japan')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'with invalid parameters' do
      before do
        patch "/api/v1/photos/#{photo.id}", params: invalid_attributes, headers: valid_headers, as: :json
      end

      it 'does not update the photo' do
        expect(photo.reload.sutra_id).not_to be_nil
      end

      it 'returns status code 422' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns a JSON response with errors' do
        expect(response.content_type).to match(a_string_including('application/json'))
      end
    end
  end

  # destroy
  describe 'DELETE /api/v1/photos/:id' do
    it 'destroys the photo' do
      expect do
        delete "/api/v1/photos/#{photo.id}", headers: valid_headers, as: :json
      end.to change(Photo, :count).by(-1)
    end

    it 'returns status code 204' do
      delete "/api/v1/photos/#{photo.id}", headers: valid_headers, as: :json
      expect(response).to have_http_status(:no_content)
    end
  end
end
