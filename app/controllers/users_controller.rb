class UsersController < ApplicationController
#do i remove this?
  def index
    @users = User.all
    render json: @users
  end
end