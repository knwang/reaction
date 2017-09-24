class Api::CardsController < ApplicationController
  def create
    list = List.find(params[:list_id])
    card = list.cards.new(card_params)

    if card.save
      render json: card.to_json, status: :created
    else
      render json: { error: card.errors.full_messages.join(', ') },
             status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid list id provided" },
           status: :unprocessable_entity
  end

  private

  def card_params
    params.require(:card).permit(:title)
  end
end
