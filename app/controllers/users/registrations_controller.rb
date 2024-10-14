module Users
  class RegistrationsController < ApplicationController
    def create
      user = User.new(sign_up_params)

      if user.save
        render json: { message: 'Signed up successfully.', user_id: user.id, user: user }, status: :created
      else
        render json: { message: "User couldn't be created successfully. #{user.errors.full_messages.to_sentence}" }, status: :unprocessable_entity
      end      
    end

    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name, :date_of_birth)
    end
  end
end
