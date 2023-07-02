# frozen_string_literal: true

require "rails_helper"
require "csv"

RSpec.describe Sutra, type: :model do
  sutras = CSV.read(Rails.root.join("db", "sutras_kanji_278_moji.csv")).flatten
  sutra_objects = sutras.each_with_index.map do |kanji, i|
    FactoryBot.create(:sutra, kanji: kanji)
  end
  describe "attributes" do
    it "has the correct kanji and correct order" do
      sutra_objects.each_with_index do |sutra, i|
        expect(sutra.kanji).to eq sutras[i]
      end
    end
  end

  it "has the correct length" do
    expect(sutra_objects.length).to eq sutras.length
  end
end
