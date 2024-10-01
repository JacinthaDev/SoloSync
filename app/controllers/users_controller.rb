class UsersController < ApplicationController
  before_action :authenticate_user! 
#do i remove this?
  def index
    @users = User.all
    render json: @users
  end
end