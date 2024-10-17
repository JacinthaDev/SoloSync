module Api
  module Users
    class SessionsController < Devise::SessionsController 
      respond_to :json

      def create
        request.env['devise.mapping'] = Devise.mappings[:user] 
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        yield resource if block_given?

        render json: { success: true, user: resource, message: "You have successfully signed in" }, status: :ok
      rescue StandardError => e
        render json: { success: false, error: e.message }, status: :unauthorized
      end

      protected

      def respond_with(resource, _opts = {})
      end
    end
  end
end
