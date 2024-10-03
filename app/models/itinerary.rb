class Itinerary < ApplicationRecord
  belongs_to :user
  hasandbelongstomany :activities
  has_many :matches
end
