require "application_system_test_case"

class ListsTest < ApplicationSystemTestCase
  def setup
    board = Board.create!(title: "My board")
    visit "/boards/#{board.id}"
  end

  test "showing then hiding the new list form" do
    refute_selector(".new-list.selected")
    refute_selector(".new-list input[type='text']")

    find(".new-list").click

    assert_selector(".new-list.selected")
    assert_selector(".new-list input[type='text']")

    find(".new-list .x-icon").click

    refute_selector(".new-list.selected")
    refute_selector(".new-list input[type='text']")
  end

  test "creating a list" do
    find(".new-list").click

    within ".new-list" do
      find("input[type='text']").set("My new list")
      click_on "Save"
    end

    assert_selector ".list-title[value='My new list']"
  end
end
