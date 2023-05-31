# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :user
  belongs_to :sutra
  validates :imageUrl, presence: true
  validates :croppedImageUrl, presence: true
  validates :note, length: { maximum: 256 }
end
