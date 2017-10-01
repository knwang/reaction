require 'test_helper'

class CardsAPITest < ActionDispatch::IntegrationTest
  class PostCardsTest < ActionDispatch::IntegrationTest
    class ValidListIdTest < ActionDispatch::IntegrationTest
      class ValidDataTest < ActionDispatch::IntegrationTest
        def setup
          @list = create(:list)
        end

        test "creates a new card" do
          assert_equal 0, @list.cards.count

          post "/api/cards",
              params: { list_id: @list.id, card: { title: "My new card" } }

          assert_equal 1, @list.cards.count
        end

        test "returns a 201" do
          post "/api/cards",
              params: { list_id: @list.id, card: { title: "My new card" } }

          assert_response 201
        end

        test "returns the new list" do
          post "/api/cards",
              params: { list_id: @list.id, card: { title: "My new card" } }

          assert_equal @list.reload.cards.last.to_json, response.body
        end
      end

      class InvalidDataTest < ActionDispatch::IntegrationTest
        def setup
          list = create(:list)

          post "/api/cards",
              params: { list_id: list.id, card: { title: '' } }
        end

        test "returns a 422" do
          assert_response 422
        end

        test "includes error text in response" do
          assert JSON.parse(response.body).has_key?("error")
        end
      end
    end

    class InvalidListIdTest < ActionDispatch::IntegrationTest
      def setup
        post "/api/cards",
            params: { list_id: 'abc', card: { title: 'My new card' } }
      end

      test "returns a 404" do
        assert_response 404
      end

      test "includes error text in response" do
        assert JSON.parse(response.body).has_key?("error")
      end
    end
  end

  class GetCardTest < ActionDispatch::IntegrationTest
    class ValidCardIdTest < ActionDispatch::IntegrationTest
      test "returns the card as json" do
        card = create(:card)
        create(:comment, card: card)

        get "/api/cards/#{card.id}"
        expected = card.as_json(include: :comments)
        assert_equal expected, JSON.parse(response.body)
      end

      test "returns a 200" do
        card = create(:card)

        get "/api/cards/#{card.id}"
        assert_response 200
      end
    end

    class InvalidCardIdTest < ActionDispatch::IntegrationTest
      test "returns a 404" do
        get "/api/cards/abc"
        assert_response 404
      end
    end
  end

  class PutCardTest < ActionDispatch::IntegrationTest
    class ValidCardIdTest < ActionDispatch::IntegrationTest
      class ValidDataTest < ActionDispatch::IntegrationTest
        def setup
          @card = create(:card)

          put "/api/cards/#{@card.id}",
              params: { card: { title: "New card title" } }
        end

        test "returns 200" do
          assert_response 200
        end

        test "returns the card as json" do
          assert_equal @card.reload.as_json, JSON.parse(response.body)
        end
      end

      class InvalidDataTest < ActionDispatch::IntegrationTest
        def setup
          card = create(:card)

          put "/api/cards/#{card.id}",
              params: { card: { title: "" } }
        end

        test "returns a 422" do
          assert_response 422
        end

        test "includes error text in response" do
          assert JSON.parse(response.body).has_key?("error")
        end
      end
    end

    class InvalidCardIdTest < ActionDispatch::IntegrationTest
      def setup
        put "/api/cards/abc",
            params: { card: { title: "New title" } }
      end

      test "returns a 404" do
        assert_response 404
      end

      test "includes error text in response" do
        assert JSON.parse(response.body).has_key?("error")
      end
    end
  end
end
