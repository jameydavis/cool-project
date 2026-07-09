require "test_helper"

class DevisePasswordsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "password reset edit page mounts astryx change-password form" do
    user = users(:one)
    token = user.send(:set_reset_password_token)

    get edit_user_password_path(reset_password_token: token)

    assert_response :success
    assert_select "#astryx-props" do
      props = JSON.parse(css_select("#astryx-props").text)
      assert_equal "password_reset_edit", props["page"]
      assert_equal token, props["auth"]["resetPasswordToken"]
    end
  end

  test "password reset does not sign the user in automatically" do
    user = users(:one)
    token = user.send(:set_reset_password_token)

    put user_password_path, params: {
      user: {
        reset_password_token: token,
        password: "newpassword123",
        password_confirmation: "newpassword123"
      }
    }

    assert_redirected_to new_user_session_path
    follow_redirect!

    assert_nil @controller.current_user if @controller.respond_to?(:current_user)
    get root_path

    assert_response :success
    assert_select "#astryx-props" do
      props = JSON.parse(css_select("#astryx-props").text)
      assert_equal "sign_in", props["page"]
      assert_nil props["user"]
    end
  end
end
