class ApplicationController < ActionController::Base
  allow_browser versions: :modern

  stale_when_importmap_changes

  before_action :set_astryx_auth, if: :devise_controller?

  private

  def set_astryx_auth
    @astryx_auth = {
      errors: resource.respond_to?(:errors) ? resource.errors.full_messages : [],
      email: resource.try(:email)
    }
  end
end
