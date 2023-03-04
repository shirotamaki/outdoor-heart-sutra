class AddNameIndexUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :uid, unique: true
  end
end
