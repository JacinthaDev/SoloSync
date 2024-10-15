class User < ApplicationRecord
  has_secure_password
  has_one_attached :profile_picture
  has_many :itineraries, dependent: :destroy
  has_many :comments, through: :itineraries
  has_many :matches, through: :itineraries #might delete
end
