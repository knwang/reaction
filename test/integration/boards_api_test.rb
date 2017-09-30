require 'test_helper'

class BoardsAPITest < ActionDispatch::IntegrationTest
  class GetBoardsTest < ActionDispatch::IntegrationTest
    test "returns a json array" do
      get "/api/boards"
      assert_match /\[.*\]/, response.body
    end
  end

  class PostBoardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      test "creates a new board" do
        assert_equal 0, Board.count

        post "/api/boards", params: { board: { title: "My new board" } }

        assert_equal 1, Board.count
      end

      test "returns a 201" do
        post "/api/boards", params: { board: { title: "My new board" } }

        assert_response 201
      end


      test "returns the new board" do
        new_board = { title: "My new board" }

        post "/api/boards", params: { board: new_board }

        assert_equal Board.first.to_json, response.body
      end
    end

    class InvalidDataTest < ActionDispatch::IntegrationTest
      test "returns a 422" do
        post "/api/boards", params: { board: { title: '' } }

        assert_response 422
      end
    end
  end

  class GetBoardTest < ActionDispatch::IntegrationTest
    class ValidBoardIdTest < ActionDispatch::IntegrationTest
      def setup
        @board = create(:board)
        list1 = create(:list, board: @board)
        create(:list, board: @board)
        create(:card, list: list1)
      end

      test "returns the board with the lists" do
        get "/api/boards/#{@board.id}"

        expected = JSON.parse(@board.to_json)

        expected = @board.as_json(include: { lists: { include: :cards } })
        assert_equal expected.to_json, response.body
      end

      test "returns a 200" do
        get "/api/boards/#{@board.id}"
        assert_response 200
      end
    end

    class InvalidBoardIdTest < ActionDispatch::IntegrationTest
      test "returns a 404" do
        get "/api/boards/abc"
        assert_response 404
      end
    end
  end
end
