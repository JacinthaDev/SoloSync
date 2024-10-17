Rails.application.routes.draw do
  resources :comments
  
  devise_for :users, controllers: {
    sessions: 'api/users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    resources :users do
      resources :sessions, only: [:create, :destroy]
      resources :itineraries, except: [:cities]
      resources :comments, only: [:index, :create]
    end

    devise_scope :user do
      post 'login', to: 'users/sessions#create' 
      post 'signup', to: 'users/registrations#create'
    end

    get '/itineraries/feed', to: 'itineraries#feed'
    get '/countries', to: 'itineraries#countries'
    get '/cities', to: 'itineraries#cities'
  end

  resources :users, only: [:index]
  get "up" => "rails/health#show", as: :rails_health_check
end
