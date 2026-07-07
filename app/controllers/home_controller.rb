class HomeController < ApplicationController
  def index
    if user_signed_in?
      @astryx_page = "dashboard"
    else
      @astryx_page = "sign_in"
      @astryx_auth = { errors: [], email: nil }
    end
  end
end
