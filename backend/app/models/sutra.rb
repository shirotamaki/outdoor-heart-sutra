# frozen_string_literal: true

class Sutra < ApplicationRecord
  has_many :photos, dependent: :destroy
  validates :kanji, presence: true
end
