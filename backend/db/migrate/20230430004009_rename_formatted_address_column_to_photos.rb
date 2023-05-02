class RenameFormattedAddressColumnToPhotos < ActiveRecord::Migration[7.0]
  def change
    rename_column :photos, :formatted_address, :address
  end
end
