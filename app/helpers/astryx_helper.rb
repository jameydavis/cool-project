module AstryxHelper
  include UserAvatarHelper

  def astryx_payload
    {
      page: astryx_page_name,
      csrfToken: form_authenticity_token,
      paths: astryx_paths,
      flash: {
        notice: flash[:notice],
        alert: flash[:alert]
      },
      user: astryx_current_user,
      auth: @astryx_auth,
      settings: @astryx_settings
    }.compact
  end

  private

  def astryx_page_name
    @astryx_page || infer_astryx_page
  end

  def infer_astryx_page
    case [ controller_path, action_name ]
    when [ "home", "index" ]
      user_signed_in? ? "dashboard" : "sign_in"
    when [ "user_settings", "edit" ] then "settings"
    when [ "users/sessions", "new" ] then "sign_in"
    when [ "users/registrations", "new" ] then "sign_up"
    when [ "devise/passwords", "new" ] then "password_reset"
    when [ "devise/passwords", "edit" ], [ "devise/passwords", "update" ] then "password_reset_edit"
    end
  end

  def astryx_paths
    {
      root: root_path,
      settings: edit_settings_path,
      settingsUpdate: settings_path,
      settingsAvatarUpdate: avatar_settings_path,
      signIn: user_session_path,
      signInPage: root_path,
      signOut: destroy_user_session_path,
      signUp: user_registration_path,
      signUpPage: new_user_registration_path,
      passwordReset: user_password_path,
      passwordResetPage: new_user_password_path
    }
  end

  def astryx_current_user
    return unless user_signed_in?

    {
      email: current_user.email,
      displayName: current_user.display_name,
      profileComplete: current_user.profile_complete?,
      profileSetupNeeded: current_user.profile_setup_needed?,
      avatarUrl: user_avatar_url(current_user, size: 120),
      avatarThumbUrl: user_avatar_url(current_user, size: 32)
    }
  end
end
