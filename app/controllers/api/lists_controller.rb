class Api::ListsController < ApplicationController
  def create
    board = Board.find(params[:board_id])
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

  def update
    board = Board.find(params[:board_id])
    list = board.lists.find(params[:id])

    list.update!(list_params)
    render json: list.to_json
  rescue ActionController::ParameterMissing, ActiveRecord::RecordNotFound
    render json: { error: "Invalid board id provided" },
           status: :unprocessable_entity
  end

  private

  def list_params
    params.require(:list).permit(:title, :position)
  end
end
