require "application_system_test_case"

class BoardsTest < ApplicationSystemTestCase
  test "redirecting when an invalid board is accessed" do
    visit "/boards/1"

    assert_equal page.current_path, "/"
  end
end
