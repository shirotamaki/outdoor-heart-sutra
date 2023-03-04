class ChangePhotosNoteLimit256Again < ActiveRecord::Migration[7.0]
  def up
    change_column :photos, :note, :string, limit: 256
  end
  def down
    change_column :photos, :note, :string
  end
end
