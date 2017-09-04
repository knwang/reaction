require 'rails_helper'

RSpec.describe "Boards" do
  let (:accept_json_headers) do
    { "ACCEPT" => "application/json" }
  end

  describe "GET /api/boards" do
    it "returns a json array" do
      get "/api/boards", headers: accept_json_headers
      expect(response.body).to match(/\[.*\]/)
    end
  end

  describe "POST /api/boards" do
    context "valid data" do
      it "creates a new board" do
        expect {
          post "/api/boards", headers: accept_json_headers, params: {
            board: { title: "My new board" }
          }
        }.to change { Board.count }.from(0).to(1)
      end

      it "returns a 201" do
        post "/api/boards", headers: accept_json_headers, params: {
          board: { title: "My new board" }
        }

        expect(response.status).to eq(201)
      end


      it "returns the new board" do
        new_board = { title: "My new board" }

        post "/api/boards", headers: accept_json_headers,
                            params: { board: new_board }

        expect(JSON.parse(response.body, symbolize_names: true))
          .to include(new_board)
      end
    end

    context "invalid data" do
      it "returns a 422" do
        post "/api/boards", headers: accept_json_headers,
                            params: { board: { title: '' } }

        expect(response.status).to eq(422)
      end
    end
  end
end
