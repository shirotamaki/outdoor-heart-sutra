require "rails_helper"

RSpec.describe "Api::V1::Sutras", type: :request do
  let(:sutras) { CSV.read(Rails.root.join("db", "sutras_kanji_278_moji.csv")).flatten }

  before do
    sutras.each { |kanji| FactoryBot.create(:sutra, kanji: kanji) }
  end

  describe "GET /index" do
    before do
      get "/api/v1/sutras"
    end

    it "returns all sutras" do
      expect(JSON.parse(response.body).size).to eq(278)
    end

    it "returns the sutras in the correct order" do
      expect(JSON.parse(response.body).map { |sutra| sutra["kanji"] }).to eq(sutras)
    end

    it "returns status code 200" do
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    let(:sutra) { Sutra.first }

    context "when sutra exists" do
      before do
        get "/api/v1/sutras/#{sutra.id}"
      end

      it "returns the sutra" do
        expect(JSON.parse(response.body)["kanji"]).to eq(sutra.kanji)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(:success)
      end
    end

    context "when sutra does not exist" do
      before do
        get "/api/v1/sutras/0"
      end

      it "returns an error message" do
        expect(JSON.parse(response.body)).to have_key("error")
      end

      it "returns status code 404" do
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
