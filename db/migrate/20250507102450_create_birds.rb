class CreateBirds < ActiveRecord::Migration[8.0]
  def change
    create_table :birds do |t|
      t.string :common_name
      t.string :scientific_name
      t.string :habitat
      t.decimal :size
      t.text :description

      t.timestamps
    end
  end
end
