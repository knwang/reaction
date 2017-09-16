require "application_system_test_case"

class ListsTest < ApplicationSystemTestCase
  def setup
    @board = Board.create!(title: "My board")
    visit "/boards/#{@board.id}"
  end

  test "showing then hiding the new list form" do
    refute_selector ".new-list.selected"
    refute_selector ".new-list input[type='text']"

    find(".new-list").click

    assert_selector ".new-list.selected"
    assert_selector ".new-list input[type='text']"

    find(".new-list .x-icon").click

    refute_selector ".new-list.selected"
    refute_selector ".new-list input[type='text']"
  end

  test "creating a list" do
    find(".new-list").click

    within ".new-list" do
      find("input[type='text']").set("My new list")
      click_on "Save"
    end

    assert_selector ".list-title[value='My new list']"
  end

  test "displaying no lists" do
    visit "/boards/#{@board.id}"
    refute_selector ".existing-lists .list-wrapper"
  end

  test "displaying one list" do
    @board.lists.create!(title: "My list")
    visit "/boards/#{@board.id}"
    assert_selector ".existing-lists .list-wrapper", count: 1
  end

  test "displaying more than one list" do
    @board.lists.create!(title: "My list")
    @board.lists.create!(title: "My other list")
    visit "/boards/#{@board.id}"
    assert_selector ".existing-lists .list-wrapper", count: 2
  end

  test "changing a list title" do
    @board.lists.create!(title: "My list")
    visit "/boards/#{@board.id}"

    title_input = find('.list-title')

    title_input.click
    title_input.set("Updated title")
    title_input.send_keys :enter

    assert_selector ".list-title[value='Updated title']"
    assert_equal "Updated title", @board.lists.first.title
  end
end
