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
end
