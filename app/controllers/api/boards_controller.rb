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

  def create
    board = Board.create!(board_params)
    render json: board, status: :created
  rescue ActiveRecord::RecordInvalid
    head :unprocessable_entity
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
