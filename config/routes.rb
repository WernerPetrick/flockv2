Rails.application.routes.draw do
  get "inertia-example", to: "inertia_example#index"
  root "pages#index"

  get "profile", to: "users#profile"

  get "/sign_up", to: "users#new", as: "sign_up"
  post "/sign_up", to: "users#create"
  delete "/sign_out", to: "sessions#destroy", as: "sign_out"
  get "/sign_in", to: "sessions#new", as: "sign_in"
  post "/sign_in", to: "sessions#create"
end
