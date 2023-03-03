class ChangeColumnOnSutras < ActiveRecord::Migration[7.0]
  def change
    change_column_null :sutras, :kanji, false
  end
end
