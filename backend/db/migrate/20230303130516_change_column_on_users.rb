class ChangeColumnOnUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :provider, false
    change_column_null :users, :uid, false
  end
end
