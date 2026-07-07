require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "root shows sign in page for guests" do
    get root_path

    assert_response :success
    assert_select "#astryx-props" do
      props = JSON.parse(css_select("#astryx-props").text)
      assert_equal "sign_in", props["page"]
      assert_nil props["user"]
    end
  end

  test "root shows dashboard for signed in users" do
    sign_in users(:two)

    get root_path

    assert_response :success
    assert_select "#astryx-props" do
      props = JSON.parse(css_select("#astryx-props").text)
      assert_equal "dashboard", props["page"]
      assert_equal "Alex Rivera", props["user"]["displayName"]
      assert props["user"]["profileComplete"]
    end
  end
end
