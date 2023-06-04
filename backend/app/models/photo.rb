# frozen_string_literal: true

class Photo < ApplicationRecord
  belongs_to :user
  belongs_to :sutra
  validates :note, length: { maximum: 256 }
end
