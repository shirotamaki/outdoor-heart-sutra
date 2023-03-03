class CreateSutras < ActiveRecord::Migration[7.0]
  def change
    create_table :sutras do |t|
      t.string :kanji

      t.timestamps
    end
  end
end
