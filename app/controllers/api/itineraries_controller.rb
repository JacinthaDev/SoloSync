module Api
  class ItinerariesController < ApplicationController
    def index
      render json: ISO3166::Country.all.map { |country| { name: country.iso_short_name, alpha2: country.alpha2 } }
    end

    def create
      @itinerary = Itinerary.new(itinerary_params)
      if @itinerary.save
        render json: @itinerary, status: :created
      else
        render json: @itinerary.errors, status: :unprocessable_entity
      end
    end

    private

    def itinerary_params
      params.require(:itinerary).permit(:city, :country, :startdate, :enddate, :description, :user_id)
    end
  end
end

