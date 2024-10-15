class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(session[:user_id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end
  
  def current_user
    if user_signed_in? 
      render json: current_user
    else
      render json: { error: 'Not authenticated' }, status: :unauthorized
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: { message: 'User created successfully.', user_id: user.id, user: user}, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :date_of_birth)
  end
end
