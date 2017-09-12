require 'rails_helper'

RSpec.describe "Lists" do
  let (:accept_json_headers) do
    { "ACCEPT" => "application/json" }
  end

  describe "GET /api/boards/:id/lists" do
    context "valid board id" do
      it "returns a json array of the board's lists" do
        board = Board.create!(title: "My board")
        list = List.create!(board: board, title: "My list")
        List.create!(board: Board.create!(title: "Other list"), title: "My list")

        get "/api/boards/#{board.id}/lists", headers: accept_json_headers
        expect(response.body).to eq([list].to_json)
      end
    end

    context "invalid board id" do
      it "returns a 404" do
        get "/api/boards/12321323123/lists", headers: accept_json_headers

        expect(response.status).to eq(404)
      end

      it "includes error text in response" do
        get "/api/boards/12321323123/lists", headers: accept_json_headers

        expect(JSON.parse(response.body)).to have_key("error")
      end
    end
  end

  describe "POST /api/boards/:id/lists" do
    let(:board) { Board.create!(title: "My board") }

    context "valid board id" do
      context "valid data" do
        it "creates a new list" do
          expect {
            post "/api/boards/#{board.id}/lists",
                headers: accept_json_headers,
                params: { list: { title: "My new list" } }
          }.to change { board.lists.count }.from(0).to(1)
        end

        it "returns a 201" do
          post "/api/boards/#{board.id}/lists",
              headers: accept_json_headers,
              params: { list: { title: "My new list" } }

          expect(response.status).to eq(201)
        end

        it "returns the new list" do
          new_list = { title: "My new list" }

          post "/api/boards/#{board.id}/lists",
              headers: accept_json_headers,
              params: { list: { title: "My new list" } }

          expect(JSON.parse(response.body, symbolize_names: true))
            .to include(new_list)
        end
      end

      context "invalid data" do
        it "returns a 422" do
          post "/api/boards/#{board.id}/lists",
              headers: accept_json_headers,
              params: { list: { title: '' } }

          expect(response.status).to eq(422)
        end

        it "includes error text in response" do
          post "/api/boards/#{board.id}/lists",
              headers: accept_json_headers,
              params: { list: { title: '' } }

          expect(JSON.parse(response.body)).to have_key("error")
        end
      end
    end

    context "invalid board id" do
      it "returns a 422" do
        post "/api/boards/4567865467890/lists",
            headers: accept_json_headers,
            params: { list: { title: 'My new board' } }

        expect(response.status).to eq(422)
      end

      it "includes error text in response" do
        post "/api/boards/4567865467890/lists",
            headers: accept_json_headers,
            params: { list: { title: 'My new board' } }

        expect(JSON.parse(response.body)).to have_key("error")
      end
    end
  end
end
