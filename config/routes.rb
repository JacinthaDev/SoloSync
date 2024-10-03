Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    resources :itineraries, only: [:index, :create]
    
    devise_scope :user do
      post 'login', to: 'users/sessions#create' 
      post 'signup', to: 'users/registrations#create' 
    end

    get '/countries', to: 'itineraries#index'
  end

  resources :users, only: [:index]
  get "up" => "rails/health#show", as: :rails_health_check
end
