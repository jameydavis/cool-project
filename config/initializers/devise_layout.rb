# frozen_string_literal: true

Rails.application.config.to_prepare do
  DeviseController.layout "application"
end
