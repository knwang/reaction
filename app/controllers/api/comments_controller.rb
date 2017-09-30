class Api::CommentsController < ApplicationController
  def create
    card = Card.find(params[:card_id])
    comment = card.comments.new(comment_params)

    if comment.save
      render json: comment.to_json, status: :created
    else
      render json: { error: comment.errors.full_messages.join(', ') },
             status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid card id provided" },
           status: :not_found
  end

  private

  def comment_params
    params.require(:comment).permit(:text)
  end
end
