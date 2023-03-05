# frozen_string_literal: true

class User < ApplicationRecord
  has_many :photos, dependent: :destroy
  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: true
end
