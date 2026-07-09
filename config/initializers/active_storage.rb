# frozen_string_literal: true

# Prefer MiniMagick when variants are used. The app currently serves original
# blobs for avatars so development works without libvips installed.
Rails.application.config.active_storage.variant_processor = :mini_magick
