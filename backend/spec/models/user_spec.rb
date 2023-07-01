# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it "validates presence of provider" do
      user = build(:user, provider: nil)
      expect(user).not_to be_valid
    end

    it "validates presence of uid" do
      user = build(:user, uid: nil)
      expect(user).not_to be_valid
    end

    it "validates uniqueness of uid" do
      create(:user, uid: "test_uid")
      user = build(:user, uid: "test_uid")
      expect(user).not_to be_valid
    end

    it "validates presence of name" do
      user = build(:user, name: nil)
      expect(user).not_to be_valid
    end

    it "validates length of name" do
      user = build(:user, name: "a" * 257)
      expect(user).not_to be_valid
    end

    it "validates presence of email" do
      user = build(:user, email: nil)
      expect(user).not_to be_valid
    end

    it "validates uniqueness of email" do
      create(:user, email: "test@example.com")
      user = build(:user, email: "test@example.com")
      expect(user).not_to be_valid
    end

    it "validates length of email" do
      user = build(:user, email: "a" * 243 + "@example.com")
      expect(user).not_to be_valid
    end
  end

  describe "associations" do
    it "has many photos" do
      user = create(:user)
      create(:photo, user: user)
      create(:photo, user: user)
      expect(user.photos.count).to eq(2)
    end
  end
end
