# frozen_string_literal: true

FactoryBot.define do
  factory :photo do
    note { "My Note" }
    latitude { 35.693539069879535 }
    longitude { 139.74961104672445 }
    address { "Tokyo, Japan" }
    user
    sutra
  end
end
