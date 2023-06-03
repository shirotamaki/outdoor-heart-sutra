class RenameCroppedImageUrlColumnToPhotos < ActiveRecord::Migration[7.0]
  def change
    rename_column :photos, :CroppedImageUrl, :cropped_image_url
  end
end
