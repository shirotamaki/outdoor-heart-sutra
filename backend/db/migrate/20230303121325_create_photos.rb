class CreatePhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :photos do |t|
      t.binary :photo_data
      t.text :note
      t.float :latitude
      t.float :longitude
      t.string :formatted_address

      t.timestamps
    end
  end
end
