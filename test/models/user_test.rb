require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "display_name uses preferred name when present" do
    user = User.new(email: "test@example.com", preferred_name: "Jamie")

    assert_equal "Jamie", user.display_name
  end

  test "profile_setup_needed until complete or updated" do
    user = users(:one)

    assert user.profile_setup_needed?

    user.update!(preferred_name: "Jamie")
    user.mark_settings_updated!

    assert_not user.profile_setup_needed?
  end
end
