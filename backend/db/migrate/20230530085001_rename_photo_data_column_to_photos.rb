class RenamePhotoDataColumnToPhotos < ActiveRecord::Migration[7.0]
  def change
    rename_column :photos, :photo_data, :image_url
  end
end
