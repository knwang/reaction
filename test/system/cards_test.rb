require "application_system_test_case"

class CardsTest < ApplicationSystemTestCase
  def setup
    @board = Board.create!(title: "My board")
    @list = @board.lists.create!(title: "My List")
    visit "/boards/#{@board.id}"
  end

  test "showing then hiding the new card form" do
    refute_selector "textarea[name='add-card']", visible: true

    find(".add-card-toggle").click

    assert_selector "textarea[name='add-card']", visible: true

    find(".add-dropdown.add-bottom .x-icon").click

    refute_selector "textarea[name='add-card']", visible: true
  end

  test "new card form can only be visible on one list at a time" do
    list2 = @board.lists.create!(title: "My other list")
    visit "/boards/#{@board.id}"

    toggles = all(".add-card-toggle")
    toggles.first.click

    within all(".list-wrapper").first do
      assert_selector "textarea[name='add-card']", visible: true
    end
    within all(".list-wrapper").last do
      refute_selector "textarea[name='add-card']", visible: true
    end

    toggles.last.click

    within all(".list-wrapper").first do
      refute_selector "textarea[name='add-card']", visible: true
    end
    within all(".list-wrapper").last do
      assert_selector "textarea[name='add-card']", visible: true
    end
  end

  test "new card form retains value when moving between lists" do
    list2 = @board.lists.create!(title: "My other list")
    visit "/boards/#{@board.id}"

    toggles = all(".add-card-toggle")
    toggles.first.click

    find("[name='add-card']").set("My card")
    toggles.last.click

    within all(".list-wrapper").last do
      assert_selector "textarea[name='add-card']", text: "My card"
    end
  end

  test "creating a list using the submit button" do
    find(".add-card-toggle").click
    find("[name='add-card']").set("My card")
    find(".button", text: "Add").click

    assert_selector ".card-info p", text: "My card"
    refute_selector "textarea[name='add-card']", text: "My card"
  end

  test "creating a list using the enter key" do
    find(".add-card-toggle").click
    input = find("[name='add-card']")
    input.set("My card")
    input.send_keys :enter

    assert_selector ".card-info p", text: "My card"
    refute_selector "textarea[name='add-card']", text: "My card"
  end

  test "displaying no lists" do
    assert_selector "#cards-container .card", count: 0
  end

  test "displaying one list" do
    @list.cards.create!(title: "My title")
    visit "/boards/#{@board.id}"
    assert_selector "#cards-container .card", count: 1
  end

  test "displaying more than one list" do
    @list.cards.create!(title: "My title")
    @list.cards.create!(title: "My title")

    visit "/boards/#{@board.id}"
    assert_selector "#cards-container .card", count: 2
  end

  test "clicking on a card shows it" do
    card = @list.cards.create!(title: "My title")

    visit "/boards/#{@board.id}"
    find("#cards-container .card").click

    assert_equal "/cards/#{card.id}", current_path
  end

  test "user navigates directly to card" do
    card = @list.cards.create!(title: "My title")

    visit "/cards/#{card.id}"

    assert has_content?(@list.board.title)
    assert has_content?(@list.title)
    assert has_content?(card.title)
  end
end
