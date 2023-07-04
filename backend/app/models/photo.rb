# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :user
  belongs_to :sutra

  validates :user, presence: true
  validates :sutra, presence: true
  validates :note, length: { maximum: 256 }

  has_one_attached :image
  has_one_attached :cropped_image
end
