# frozen_string_literal: true

require "csv"

begin
  seeds_config = Rails.application.config_for(:sutras_seeds)
  sutras_csv_path = seeds_config["sutras_csv_path"]

  CSV.foreach(sutras_csv_path) do |row|
    Sutra.create!(kanji: row[0])
  end
rescue StandardError => e
  puts "Error occurred while populating sutras: #{e}"
end
