module UserAvatarHelper
  def user_avatar_url(user, size: nil)
    return unless user&.avatar&.attached?

    # Serve the original blob so avatars work without libvips/ImageMagick.
    url_for(user.avatar)
  end
end
