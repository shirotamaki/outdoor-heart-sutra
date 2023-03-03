class ChangeColumnOnPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column_null :photos, :photo_data, false
    add_reference :photos, :user,  foreign_key: true
    add_reference :photos, :sutra, foreign_key: true
  end
end
