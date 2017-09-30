require "application_system_test_case"

class CardsTest < ApplicationSystemTestCase
  def setup
    @board = create(:board)
    @list = create(:list, board: @board)
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
    create(:list, board: @board)
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
    create(:list, board: @board)
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
    create(:card, list: @list)
    visit "/boards/#{@board.id}"
    assert_selector "#cards-container .card", count: 1
  end

  test "displaying more than one list" do
    2.times { create(:card, list: @list) }

    visit "/boards/#{@board.id}"
    assert_selector "#cards-container .card", count: 2
  end

  test "clicking on a card shows it" do
    card = create(:card, list: @list)

    visit "/boards/#{@board.id}"
    find("#cards-container .card").click

    assert_equal "/cards/#{card.id}", current_path
  end

  test "user navigates directly to card" do
    card = create(:card, list: @list)

    visit "/cards/#{card.id}"

    assert has_content?(@list.board.title)
    assert has_content?(@list.title)
    assert has_content?(card.title)
  end

  test "user edits card" do
    card = create(:card, list: @list)

    visit "/cards/#{card.id}"

    input = find("#modal-container .list-title")
    input.click
    input.set("My new title")
    input.send_keys :enter

    find("#description-edit").click
    input = find(".description .textarea-toggle")
    input.set("My description")

    find(".description .button[value='Save']").click

    refute_selector ".description .button[value='Save']"
    refute_selector ".description .description-edit-options"

    card.reload

    assert_equal "My new title", card.title
    assert_equal "My description", card.description
  end
end
