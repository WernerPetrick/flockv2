class CreateSubmissions < ActiveRecord::Migration[8.0]
  def change
    create_table :submissions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :bird, null: false, foreign_key: true
      t.string :status
      t.string :submitted_common_name
      t.text :notes
      t.string :location

      t.timestamps
    end
  end
end
