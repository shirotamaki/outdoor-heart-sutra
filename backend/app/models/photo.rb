# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :user
  belongs_to :sutra
  validates :image_url, presence: true
  validates :cropped_image_url, presence: true
  validates :note, length: { maximum: 256 }
end
