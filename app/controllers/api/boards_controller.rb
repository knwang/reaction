class Api::BoardsController < ApplicationController
  def index
    render json: Board.all
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
