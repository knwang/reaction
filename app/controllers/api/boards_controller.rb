class Api::BoardsController < ApplicationController
  def index
    dummy_data = [{
      id: 1,
      title: "Web Development"
    }, {
      id: 2,
      title: "Recipes"
    }]

    render json: dummy_data
  end
end
