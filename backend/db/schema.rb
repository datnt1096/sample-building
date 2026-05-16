# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_16_091417) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "apartments", force: :cascade do |t|
    t.bigint "building_id", null: false
    t.datetime "created_at", null: false
    t.string "layout", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.string "unit", null: false
    t.datetime "updated_at", null: false
    t.index ["building_id", "unit"], name: "index_apartments_on_building_id_and_unit", unique: true
    t.index ["building_id"], name: "index_apartments_on_building_id"
  end

  create_table "building_policies", force: :cascade do |t|
    t.bigint "building_id", null: false
    t.datetime "created_at", null: false
    t.text "note"
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["building_id"], name: "index_building_policies_on_building_id"
  end

  create_table "buildings", force: :cascade do |t|
    t.text "additional_info", default: [], null: false, array: true
    t.string "address"
    t.string "building_type", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.string "location", null: false
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.string "zip"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "apartments", "buildings"
  add_foreign_key "building_policies", "buildings"
end
