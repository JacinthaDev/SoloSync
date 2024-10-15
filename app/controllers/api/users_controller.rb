class Api::UsersController < ApplicationController
  before_action :set_user, only: [:upload_profile_picture]

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

  def upload_profile_picture
    if @user.update(profile_picture: params[:profile_picture])
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :date_of_birth)
  end
end
