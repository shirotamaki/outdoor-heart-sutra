class ChangeCroppedImageUrlInPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column_null :photos, :cropped_image_url, false
  end
end
