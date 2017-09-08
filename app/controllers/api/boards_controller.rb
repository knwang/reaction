class Api::BoardsController < ApplicationController
  def index
    render json: Board.all
  end

  def create
    board = Board.new(board_params)

    if board.save
      render json: board, status: :created
    else
      render json: { error: board.errors.full_messages.join(', ') },
             status: :unprocessable_entity
    end
  rescue ActionController::ParameterMissing
    render json: { error: "Invalid board data provided" },
           status: :unprocessable_entity
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
