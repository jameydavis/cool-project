class UserSettingsController < ApplicationController
  include UserAvatarHelper

  before_action :authenticate_user!

  def edit
    @user = current_user
    @astryx_settings = astryx_settings_props(
      @user,
      profile_prompt: params[:profile_prompt].present?
    )
  end

  def update
    @user = current_user
    profile_prompt = params[:profile_prompt].present?

    if @user.update(user_settings_params)
      @user.mark_settings_updated!
      notice = profile_saved_notice

      respond_to do |format|
        format.html { redirect_to root_path, notice: notice }
        format.json { render json: { redirectTo: root_path, notice: notice } }
      end
    else
      @astryx_settings = astryx_settings_props(
        @user,
        profile_prompt: profile_prompt,
        errors: @user.errors.full_messages
      )

      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @astryx_settings, status: :unprocessable_entity }
      end
    end
  end

  def avatar
    @user = current_user
    file = avatar_params[:avatar]

    if file.blank?
      return render json: { errors: [ "Please choose an image to upload." ] }, status: :unprocessable_entity
    end

    if @user.update(avatar: file)
      render json: {
        notice: "Profile photo updated.",
        avatarUrl: user_avatar_url(@user, size: 120),
        avatarThumbUrl: user_avatar_url(@user, size: 32)
      }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def avatar_params
    params.require(:user).permit(:avatar)
  end

  def user_settings_params
    params.require(:user).permit(
      :preferred_name, :phone_number,
      :address_line1, :address_line2, :city, :state,
      :postal_code, :country, :bio, :timezone
    )
  end

  def profile_saved_notice
    if @user.profile_complete?
      "Your profile is complete. Welcome!"
    else
      "Your settings have been saved."
    end
  end

  def astryx_settings_props(user, profile_prompt: false, errors: [])
    {
      profilePrompt: profile_prompt,
      errors: errors,
      user: {
        email: user.email,
        preferredName: user.preferred_name,
        phoneNumber: user.phone_number,
        addressLine1: user.address_line1,
        addressLine2: user.address_line2,
        city: user.city,
        state: user.state,
        postalCode: user.postal_code,
        country: user.country,
        bio: user.bio,
        timezone: user.timezone,
        avatarUrl: avatar_url_for(user)
      }
    }
  end

  def avatar_url_for(user)
    user_avatar_url(user, size: 120)
  end
end
