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
end
