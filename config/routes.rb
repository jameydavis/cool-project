Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions"
  }

  resource :settings, only: [ :edit, :update ], controller: "user_settings" do
    patch :avatar, on: :collection
  end
  get "settings", to: redirect("/settings/edit")

  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
end
