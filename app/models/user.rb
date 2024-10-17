class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :itineraries, dependent: :destroy
  has_many :comments, through: :itineraries
  has_many :matches, through: :itineraries #might delete
end
