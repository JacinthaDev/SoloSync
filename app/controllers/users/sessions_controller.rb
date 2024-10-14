module Users
  class SessionsController < ApplicationController

    # Handle user login
    def create
      user = User.find_by(email: params[:user][:email]) # Find user by email
  
      # Authenticate the user using bcrypt's `authenticate` method
      if user && user.authenticate(params[:user][:password]) # Check if the password is valid
        session[:user_id] = user.id
        render json: { user_id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, date_of_birth: user.date_of_birth }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    # Handle user logout
    def respond_to_on_destroy
      render json: { message: 'You are logged out.' }, status: :ok
    end
  end
end
