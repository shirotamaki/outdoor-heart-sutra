class ChangeUserIdAndSutraIdInPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column_null :photos, :user_id, false
    change_column_null :photos, :sutra_id, false
  end
end
