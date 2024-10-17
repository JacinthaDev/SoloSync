Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    # Standard RESTful routes for itineraries
    resources :itineraries, only: [:index, :create] do
      # Custom route for fetching cities within itineraries
      collection do
        get 'cities', to: 'itineraries#cities'
      end
    end
    
    # Custom user session and registration routes
    devise_scope :user do
      post 'login', to: 'users/sessions#create' 
      post 'signup', to: 'users/registrations#create' 
    end

    # Route to fetch countries
    get '/countries', to: 'itineraries#index'
  end

  # Routes for users
  resources :users, only: [:index]

  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check
end
