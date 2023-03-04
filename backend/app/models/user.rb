class User < ApplicationRecord
  has_many :photos, dependent: :destroy
end
