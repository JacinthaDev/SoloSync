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

ActiveRecord::Schema[7.2].define(version: 2024_10_14_203109) do
  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "itinerary_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["itinerary_id"], name: "index_comments_on_itinerary_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "itineraries", force: :cascade do |t|
    t.date "start_date"
    t.date "end_date"
    t.string "country"
    t.string "city"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.index ["user_id"], name: "index_itineraries_on_user_id"
  end

  create_table "itinerary_activities", force: :cascade do |t|
    t.integer "itinerary_id", null: false
    t.integer "activity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_id"], name: "index_itinerary_activities_on_activity_id"
    t.index ["itinerary_id"], name: "index_itinerary_activities_on_itinerary_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "profile_picture"
    t.text "bio"
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "comments", "itineraries"
  add_foreign_key "comments", "users"
  add_foreign_key "itineraries", "users"
  add_foreign_key "itinerary_activities", "activities"
  add_foreign_key "itinerary_activities", "itineraries"
end
