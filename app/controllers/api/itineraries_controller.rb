require 'net/http'
require 'json'
require 'uri'

module Api
  class ItinerariesController < ApplicationController
    #before_action :authenticate_user!
    #before_action countries, only: %i[cities]
    before_action :set_user, only: %i[create update destroy index]
    before_action :set_itinerary, only: %i[show update destroy edit]

    def index
      render json: @user.itineraries, status: :ok
    end

    def show
      render json: @itinerary, status: :ok
    end

    def create
      @itinerary = @user.itineraries.new(itinerary_params)

      if @itinerary.save
        render json: { itinerary: @itinerary }, status: :created
      else
        render json: { errors: @itinerary.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def cities
      country_code = params[:country_code]
      uri = URI("https://api.api-ninjas.com/v1/city?country=#{country_code}")

      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(uri)
      request['X-Api-Key'] = ENV['API_KEY']

      response = http.request(request)

      if response.is_a?(Net::HTTPSuccess)
        cities_data = JSON.parse(response.body)
        if cities_data.empty?
          render json: { message: "No cities found." }
        else
          render json: cities_data
        end
      else
        render json: { error: response.message }, status: response.code
      end
    end
    
    def edit
    end

    def update
      if @itinerary.update(itinerary_params)
        render json: @itinerary, status: :ok
      else
        render json: { errors: @itinerary.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    end

    def destroy
      @itinerary.destroy
      render json: { message: 'Itinerary successfully deleted.' }, status: :ok
    end     

    def countries
      render json: ISO3166::Country.all.map { |country| { name: country.iso_short_name, alpha2: country.alpha2 } }
    end

    private

    def set_user
      @user = current_user
      render json: { error: "User not authenticated" }, status: :unauthorized unless @user
    end

    def set_itinerary
      @itinerary = current_user.itineraries.find(params[:id])
      render json: { error: "Itinerary not found" }, status: :not_found unless @itinerary
    end

    def itinerary_params
      params.require(:itinerary).permit(:city, :country, :start_date, :end_date, :description)
    end
  end
end
