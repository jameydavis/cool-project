class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :avatar

  validates :preferred_name, length: { maximum: 100 }, allow_blank: true
  validates :phone_number, length: { maximum: 30 }, allow_blank: true
  validates :address_line1, :address_line2, length: { maximum: 255 }, allow_blank: true
  validates :city, :state, length: { maximum: 100 }, allow_blank: true
  validates :postal_code, length: { maximum: 20 }, allow_blank: true
  validates :country, length: { maximum: 100 }, allow_blank: true
  validates :bio, length: { maximum: 500 }, allow_blank: true
  validate :timezone_must_be_valid, if: -> { timezone.present? }
  validate :acceptable_avatar

  def display_name
    preferred_name.presence || email
  end

  def profile_complete?
    preferred_name.present? &&
      phone_number.present? &&
      address_line1.present? &&
      city.present? &&
      state.present? &&
      postal_code.present?
  end

  def profile_setup_needed?
    !profile_complete? && settings_updated_at.nil?
  end

  def mark_settings_updated!
    touch(:settings_updated_at)
  end

  def timezone_must_be_valid
    return if ActiveSupport::TimeZone[timezone]

    errors.add(:timezone, "is not valid")
  end

  private

  def acceptable_avatar
    return unless avatar.attached?

    unless avatar.blob.content_type.in?(%w[image/jpeg image/png image/webp image/gif])
      errors.add(:avatar, "must be a JPEG, PNG, WebP, or GIF")
    end

    if avatar.blob.byte_size > 5.megabytes
      errors.add(:avatar, "must be smaller than 5 MB")
    end
  end
end
