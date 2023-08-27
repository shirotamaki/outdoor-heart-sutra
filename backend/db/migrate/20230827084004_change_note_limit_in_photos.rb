class ChangeNoteLimitInPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column :photos, :note, :string, limit: 140
  end
end
