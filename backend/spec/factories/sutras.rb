# frozen_string_literal: true

require 'csv'

FactoryBot.define do
  factory :sutra do
    sutras = CSV.read(Rails.root.join('db', 'sutras_kanji_278_moji.csv')).flatten
    sequence(:kanji) { |n| sutras[n] }
  end
end
