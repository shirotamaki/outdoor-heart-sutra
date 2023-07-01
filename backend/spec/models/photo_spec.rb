# frozen_string_literal: true

require "rails_helper"

RSpec.describe Photo, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:sutra) }
  end

  describe "validations" do
    it { should validate_length_of(:note).is_at_most(256) }
  end
end
