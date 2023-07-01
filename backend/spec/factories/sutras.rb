# frozen_string_literal: true

FactoryBot.define do
  factory :sutra do
    sequence(:kanji) { |n| "sutra#{n}" }
  end
end
