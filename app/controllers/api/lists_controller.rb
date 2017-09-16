class Api::ListsController < ApplicationController
  def index
    board = Board.find(params[:id])
    render json: board.lists
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid board id provided" },
           status: :not_found
  end

  def create
    board = Board.find(params[:id])
    list = List.new(list_params.merge(board: board))

    if list.save
      render json: list, status: :created
    else
      render json: { error: list.errors.full_messages.join(', ') },
             status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid board id provided" },
           status: :unprocessable_entity
  end

  private

  def list_params
    params.require(:list).permit(:title, :position)
  end
end
