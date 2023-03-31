# frozen_string_literal: true

require 'csv'

CSV.foreach('db/sutra.csv') do |row|
  Sutra.create(kanji: row[0])
end
