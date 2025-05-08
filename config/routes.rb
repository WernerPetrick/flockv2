Rails.application.routes.draw do
  get "inertia-example", to: "inertia_example#index"
  root "pages#index"

  get "profile", to: "users#profile"
  get "explore", to: "birds#explore"
  get "explore/:id", to: "birds#explore", as: :explore_bird

  # Update this when the Bird and Sighting model is introduced
  get "profile/seen-birds", to: "users#seen_birds"
  get "profile/wishlist", to: "users#wishlist"
  get "profile/email-settings", to: "users#email_settings"
  get "profile/authentication", to: "users#authentication"
  get "profile/submissions", to: "users#submissions"

  get "/sign_up", to: "users#new", as: "sign_up"
  post "/sign_up", to: "users#create"
  delete "/sign_out", to: "sessions#destroy", as: "sign_out"
  get "/sign_in", to: "sessions#new", as: "sign_in"
  post "/sign_in", to: "sessions#create"

  resources :birds
end
