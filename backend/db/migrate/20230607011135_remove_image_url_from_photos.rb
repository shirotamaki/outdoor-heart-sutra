class RemoveImageUrlFromPhotos < ActiveRecord::Migration[7.0]
  def change
    remove_column :photos, :image_url, :text
    remove_column :photos, :cropped_image_url, :text
  end
end
