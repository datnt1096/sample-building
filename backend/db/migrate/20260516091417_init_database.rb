class InitDatabase < ActiveRecord::Migration[8.1]
  def change
    create_table :buildings do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.string :address
      t.string :zip
      t.string :building_type, null: false
      t.text :description
      t.text :additional_info, array: true, default: [], null: false
      t.timestamps
    end

    create_table :apartments do |t|
      t.references :building, null: false, foreign_key: true
      t.string :unit, null: false
      t.decimal :price, precision: 10, scale: 2, null: false
      t.string :layout, null: false
      t.timestamps
    end

    add_index :apartments, %i[building_id unit], unique: true

    create_table :building_policies do |t|
      t.references :building, null: false, foreign_key: true
      t.string :title, null: false
      t.text :note
      t.timestamps
    end
  end
end
