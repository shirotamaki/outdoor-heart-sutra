class ChangeNoteToPhotos < ActiveRecord::Migration[7.0]
  def change
    change_column :photos, :note, :string
  end
end
