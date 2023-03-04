# frozen_string_literal: true

class User < ApplicationRecord
  has_many :photos, dependent: :destroy
end
