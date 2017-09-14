require "application_system_test_case"

class BoardsTest < ApplicationSystemTestCase
  test "redirecting when an invalid board is accessed" do
    visit "/boards/1"

    assert_equal page.current_path, "/"
  end

  class CreatingBoardsTest < ApplicationSystemTestCase
    test "creating with a blank title does not save the board" do
      visit "/"

      find(".board-tile").click

      within ".board-tile" do
        find("input[type='text']").set("")
        click_on "Create"
      end

      assert_equal Board.count, 0
      assert_selector ".board-tile input[type='text']"
    end

    test "creating a board successfully" do
      visit "/"

      find(".board-tile").click

      within ".board-tile" do
        find("input[type='text']").set("My board")
        click_on "Create"
      end

      refute_selector ".board-tile input[type='text']"
      assert_equal 1, Board.count
    end
  end
end
