class AddSpeciesToBirds < ActiveRecord::Migration[8.0]
  def change
    add_column :birds, :species, :string
  end
end
