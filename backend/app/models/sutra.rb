class Sutra < ApplicationRecord
  has_many :photos, dependent: :destroy
end
