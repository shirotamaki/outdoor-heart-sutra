class ChangeColumnToPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column_null :photos, :image_url, true
    change_column_null :photos, :cropped_image_url, true
  end
end
