# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :user
  belongs_to :sutra
  validates :photo_data, presence: true
  validates :note, length: { maximum: 256 }
end
