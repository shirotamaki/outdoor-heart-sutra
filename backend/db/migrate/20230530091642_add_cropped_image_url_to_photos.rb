class AddCroppedImageUrlToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :CroppedImageUrl, :text
  end
end
