class ChangePhotosNoteLimit256 < ActiveRecord::Migration[7.0]
  def change
    change_column :photos, :note, :text, limit: 512
  end
end
