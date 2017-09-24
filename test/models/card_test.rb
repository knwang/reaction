class CardTests < ActiveSupport::TestCase
  test "json representation includes board_id" do
    board = Board.create!(title: "My board")
    list = board.lists.create!(title: "My list")
    card = list.cards.create!(title: "My card")

    json = card.as_json
    assert json.has_key?("board_id")
  end
end
