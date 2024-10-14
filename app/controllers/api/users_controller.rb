module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:index]
    
    def index
      render json: current_user
    end
  end
end
