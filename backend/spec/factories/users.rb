# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    provider { "google" }
    sequence(:uid) { |n| "uid#{n}" }
    sequence(:name) { |n| "user#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
  end
end
