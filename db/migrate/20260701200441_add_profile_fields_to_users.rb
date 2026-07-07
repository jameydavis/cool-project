class AddProfileFieldsToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :preferred_name, :string
    add_column :users, :phone_number, :string
    add_column :users, :address_line1, :string
    add_column :users, :address_line2, :string
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :postal_code, :string
    add_column :users, :country, :string
    add_column :users, :bio, :text
    add_column :users, :timezone, :string
    add_column :users, :settings_updated_at, :datetime
  end
end
