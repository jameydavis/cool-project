module UserAvatarHelper
  def user_avatar_url(user, size: 120)
    return unless user&.avatar&.attached?

    url_for(user.avatar.variant(resize_to_fill: [ size, size ]))
  end
end
