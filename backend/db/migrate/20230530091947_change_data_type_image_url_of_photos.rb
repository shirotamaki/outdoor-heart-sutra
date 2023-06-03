class ChangeDataTypeImageUrlOfPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column :photos, :image_url, :text
  end
end
