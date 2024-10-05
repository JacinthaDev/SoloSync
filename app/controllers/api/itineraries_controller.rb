require 'net/http'
require 'json'
require 'uri'

module Api
  class ItinerariesController < ApplicationController
    before_action :set_user, only: %i[ create ]
    before_action :authenticate_user!

    def index
      render json: ISO3166::Country.all.map { |country| { name: country.iso_short_name, alpha2: country.alpha2 } }
    end

    def create
      @itinerary = current_user.itineraries.new(itinerary_params) 
    
      if @itinerary.save
        render json: { itinerary: @itinerary }, status: :created
      else
        render json: { errors: @itinerary.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def cities
      country_code = params[:country_code] 
      puts "Session Data: #{session.inspect}"
      uri = URI("https://api.api-ninjas.com/v1/city?country=#{country_code}")
    
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true 
    
      request = Net::HTTP::Get.new(uri)
      request['X-Api-Key'] = ENV['API_KEY']

      response = http.request(request)
    
      if response.is_a?(Net::HTTPSuccess)
        cities_data = JSON.parse(response.body)

        if cities_data.empty?
          puts "hello" 
          render json: { message: "No cities found." } 
        else
          puts cities_data 
          render json: cities_data 
        end
      else
        puts "Error: #{response.message}"  
        render json: { error: response.message }, status: response.code
      end
    end
    

    private

    def set_user
      @user = current_user
      # unless @user
      #   render json: { error: "User not authenticated" }, status: :unauthorized
      # end
    end
    

    def itinerary_params
      params.require(:itinerary).permit(:city, :country, :start_date, :end_date, :description, :user_id)
    end
  end
end
