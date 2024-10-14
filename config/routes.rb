Rails.application.routes.draw do
  resources :comments

  namespace :api do
    resources :users do
      resources :itineraries, except: [:cities]
      resources :comments, only: [:index, :create]
    end

    get '/itineraries/feed', to: 'itineraries#feed'
    get '/countries', to: 'itineraries#countries'
    get '/cities', to: 'itineraries#cities'
  end

  # User Registration
  post 'signup', to: 'users/registrations#create'

  # User Sessions
  post 'login', to: 'users/sessions#create'
  delete 'logout', to: 'users/sessions#destroy'

  resources :users, only: [:index]

  # Health check route 
  get "up" => "rails/health#show", as: :rails_health_check
end
