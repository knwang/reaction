require 'test_helper'

class ListsAPITest < ActionDispatch::IntegrationTest
  class GetListsTest < ActionDispatch::IntegrationTest
    class ValidBoardIdTest < ActionDispatch::IntegrationTest
      test "returns a json array of the board's lists" do
        board = Board.create!(title: "My board")
        list = List.create!(board: board, title: "My list")
        List.create!(board: Board.create!(title: "Other list"), title: "My list")

        get "/api/boards/#{board.id}/lists"
        assert_equal [list].to_json, response.body
      end
    end

    class InvalidBoardIdTest < ActionDispatch::IntegrationTest
      def setup
        get "/api/boards/12321323123/lists"
      end

      test "returns a 404" do
        assert_response 404
      end

      test "includes error text in response" do
        assert JSON.parse(response.body).has_key?("error")
      end
    end
  end

  class PostListsTest < ActionDispatch::IntegrationTest
    class ValidBoardIdTest < ActionDispatch::IntegrationTest
      class ValidDataTest < ActionDispatch::IntegrationTest
        def setup
          @board = Board.create!(title: "My board")
        end

        test "creates a new list" do
          assert_equal 0, @board.lists.count

          post "/api/boards/#{@board.id}/lists",
              params: { list: { title: "My new list" } }

          assert_equal 1, @board.lists.count
        end

        test "returns a 201" do
          post "/api/boards/#{@board.id}/lists",
              params: { list: { title: "My new list" } }

          assert_response 201
        end

        test "returns the new list" do
          post "/api/boards/#{@board.id}/lists",
              params: { list: { title: "My new list" } }

          assert_equal @board.reload.lists.last.to_json, response.body
        end
      end

      class InvalidDataTest < ActionDispatch::IntegrationTest
        def setup
          @board = Board.create!(title: "My board")

          post "/api/boards/#{@board.id}/lists",
              params: { list: { title: '' } }
        end

        test "returns a 422" do
          assert_response 422
        end

        test "includes error text in response" do
          assert JSON.parse(response.body).has_key?("error")
        end
      end
    end

    class InvalidBoardIdTest < ActionDispatch::IntegrationTest
      def setup
        post "/api/boards/4567865467890/lists",
            params: { list: { title: 'My new board' } }
      end

      test "returns a 422" do
        assert_response 422
      end

      test "includes error text in response" do
        assert JSON.parse(response.body).has_key?("error")
      end
    end
  end

  class PutListsTest < ActionDispatch::IntegrationTest
    class ValidBoardIdTest < ActionDispatch::IntegrationTest
      class ValidDataTest < ActionDispatch::IntegrationTest
        def setup
          board = Board.create!(title: "My board")
          @list = board.lists.create!(title: "My list", position: 1.0)

          put "/api/boards/#{board.id}/lists/#{@list.id}",
              params: { list: { title: "New title", position: 10.123 } }
        end

        test "updates the list title" do
          assert_equal "New title", @list.reload.title
        end

        test "updates the list position" do
          assert_equal 10.123, @list.reload.position
        end

        test "returns a 200" do
          assert_response 200
        end

        test "returns the list" do
          assert_equal JSON.parse(@list.reload.to_json), JSON.parse(response.body)
        end
      end

      class InvalidDataTest < ActionDispatch::IntegrationTest
        def setup
          board = Board.create!(title: "My board")
          @list = board.lists.create!(title: "My list", position: 1.0)

          put "/api/boards/#{board.id}/lists/#{@list.id}",
              params: { }
        end

        test "returns a 422" do
          assert_response 422
        end

        test "includes error text in response" do
          assert JSON.parse(response.body).has_key?("error")
        end
      end
    end

    class InvalidBoardIdTest < ActionDispatch::IntegrationTest
      def setup
        board = Board.create!(title: "My board")
        @list = board.lists.create!(title: "My list", position: 1.0)

        put "/api/boards/1234567890876543/lists/#{@list.id}",
            params: { list: { } }
      end

      test "returns a 422" do
        assert_response 422
      end

      test "includes error text in response" do
        assert JSON.parse(response.body).has_key?("error")
      end
    end
  end
end
