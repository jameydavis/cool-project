class Users::SessionsController < Devise::SessionsController
  protected

  def after_sign_in_path_for(resource)
    if resource.profile_setup_needed?
      edit_settings_path(profile_prompt: true)
    else
      root_path
    end
  end
end
