class User < ApplicationRecord
  has_secure_password
  has_many :itineraries, dependent: :destroy
  has_many :comments, through: :itineraries
  has_many :matches, through: :itineraries #might delete
end
