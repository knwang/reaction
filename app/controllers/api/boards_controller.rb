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

  def show
    board = Board.find(params[:id])
    board_json = board.as_json
    board_json["lists"] = []

    board.lists.each do |list|
      list_json = list.as_json
      list_json["cards"] = list.cards.where(archived: false).as_json(include: :comments)
      board_json["lists"] << list_json
    end

    render json: board_json
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid board id provided" },
           status: :not_found
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
