require "test_helper"

class UserSettingsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    sign_in @user
  end

  test "edit settings page mounts astryx app" do
    get edit_settings_path

    assert_response :success
    assert_select "#astryx-root"
    assert_select "#astryx-props" do
      props = JSON.parse(css_select("#astryx-props").text)
      assert_equal "settings", props["page"]
    end
  end

  test "update settings marks profile as updated" do
    patch settings_path, params: {
      user: {
        preferred_name: "Jamie",
        phone_number: "555-9999"
      }
    }, as: :json

    assert_response :success
    @user.reload

    assert_equal "Jamie", @user.preferred_name
    assert_not_nil @user.settings_updated_at
  end

  test "avatar upload saves photo and returns url" do
    patch avatar_settings_path, params: {
      user: {
        avatar: fixture_file_upload("avatar.png", "image/png")
      }
    }

    assert_response :success
    @user.reload

    assert @user.avatar.attached?

    payload = JSON.parse(response.body)
    assert_equal "Profile photo updated.", payload["notice"]
    assert_includes payload["avatarUrl"], "/rails/active_storage"
    assert_includes payload["avatarThumbUrl"], "/rails/active_storage"
  end
end
