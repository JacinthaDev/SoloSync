Rails.application.routes.draw do
  resources :itineraries

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  namespace :api do
    devise_scope :user do
      post 'login', to: 'users/sessions#create' 
      post 'signup', to: 'users/registrations#create' 
    end
  end

  resources :users, only: [:index]
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
