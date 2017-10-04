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

        test "creates an action" do
          post "/api/cards",
              params: { list_id: @list.id, card: { title: "My new card" } }

          card = Card.first

          assert_equal 1, card.actions.count

          assert_equal(
            " added this card to #{@list.title}",
            card.actions.first.description
          )
        end

        test "copies a card" do
          list2 = create(:list)
          original_card = create(:card, list: @list, due_date: 1.day.from_now)
          original_action = original_card.actions.create!(description: "blah")
          original_comment = original_card.comments.create!(text: "blah")

          post "/api/cards",
              params: { list_id: list2.id,
                        card: { title: "copied card",
                                copy_from: original_card.id,
                                position: 100,
                                keep: {
                                  comments: false
                                } } }

          card = Card.last

          assert_equal 1, card.actions.count

          assert_equal(
            " copied this card from #{original_card.title} in list #{@list.title}",
            card.actions.first.description
          )

          assert_equal 0, card.comments.count

          assert_equal original_card.description, card.description
          assert_equal "copied card", card.title

          assert_equal list2, card.list
        end

        test "copies comments" do
          original_card = create(:card, list: @list, due_date: 1.day.from_now)
          original_action = original_card.actions.create!(description: "blah")
          original_comment = original_card.comments.create!(text: "blah")

          post "/api/cards",
            params: { list_id: @list.id,
                      card: { title: "copied card",
                              copy_from: original_card.id,
                              position: 100,
                              keep: {
                                comments: true
                              } } }

          card = Card.last

          assert_equal 1, card.comments.count
          refute_equal original_comment.id, card.comments.first.id
          assert_equal "blah", card.comments.first.text
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
        create(:action, actionable: card)

        get "/api/cards/#{card.id}"
        expected = JSON.parse(card.as_json(include: [:comments, :actions]).to_json)
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
        test "returns 200" do
          card = create(:card)

          put "/api/cards/#{card.id}",
              params: { card: { title: "New card title" } }

          assert_response 200
        end

        test "returns the card as json" do
          card = create(:card)

          put "/api/cards/#{card.id}",
              params: { card: { title: "New card title" } }

          expected = JSON.parse(card.reload.as_json(include: :actions).to_json)
          assert_equal expected, JSON.parse(response.body)
        end

        test "creates an action if due date is changed" do
          card = create(:card, due_date: Time.now)

          assert_equal 0, card.reload.actions.count

          put "/api/cards/#{card.id}",
              params: { card: { due_date: Time.now + 1.day } }

          assert_equal 1, card.reload.actions.count
        end

        test "creates an action if completed status is changed" do
          card = create(:card, completed: false)

          assert_equal 0, card.reload.actions.count

          put "/api/cards/#{card.id}",
              params: { card: { completed: true } }

          assert_equal 1, card.reload.actions.count
        end

        test "creates an action if the card is moved to another list" do
          list = create(:list)
          other_list = create(:list, board: list.board)
          card = create(:card, list: list)

          put "/api/cards/#{card.id}",
              params: { card: { list_id: other_list.id } }

          assert_equal 1, card.reload.actions.count
          assert_equal(
            "moved this card from #{list.title} to #{other_list.title}",
            card.actions.first.description
          )
        end

        test "creates an action if the card is moved to another board" do
          list = create(:list)
          other_list = create(:list)
          card = create(:card, list: list)

          put "/api/cards/#{card.id}",
              params: { card: { list_id: other_list.id } }

          assert_equal 1, card.reload.actions.count
          assert_equal(
            "transferred this card from #{list.board.title}",
            card.actions.first.description
          )
        end

        test "creates more than one action" do
          card = create(:card, completed: false)

          assert_equal 0, card.reload.actions.count

          put "/api/cards/#{card.id}",
              params: { card: {
                due_date: Date.today.iso8601,
                completed: true
              } }

          assert_equal 2, card.reload.actions.count
        end
      end

      class InvalidDataTest < ActionDispatch::IntegrationTest
        def setup
          @card = create(:card, completed: false)

          put "/api/cards/#{@card.id}",
              params: { card: { title: "", completed: true } }
        end

        test "returns a 422" do
          assert_response 422
        end

        test "includes error text in response" do
          assert JSON.parse(response.body).has_key?("error")
        end

        test "doesn't create any actions" do
          assert_equal 0, @card.reload.actions.count
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
