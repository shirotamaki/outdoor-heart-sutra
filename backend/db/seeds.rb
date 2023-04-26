# frozen_string_literal: true

require 'csv'

seeds_config = Rails.application.config_for(:seeds)
sutras_csv_path = seeds_config["sutras_csv_path"]

CSV.foreach(sutras_csv_path) do |row|
  Sutra.create!(kanji: row[0])
end
