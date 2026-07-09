class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  stale_when_importmap_changes

  before_action :set_astryx_auth, if: :devise_controller?

  private

  def set_astryx_auth
    auth = {
      errors: resource.respond_to?(:errors) ? resource.errors.full_messages : [],
      email: resource.try(:email)
    }

    if controller_path == "devise/passwords" && action_name.in?(%w[edit update])
      auth[:resetPasswordToken] = password_reset_token
      auth[:minimumPasswordLength] = Devise.password_length.min
    end

    @astryx_auth = auth
  end

  def password_reset_token
    params.dig(:user, :reset_password_token).presence ||
      params[:reset_password_token].presence ||
      resource.try(:reset_password_token)
  end
end
