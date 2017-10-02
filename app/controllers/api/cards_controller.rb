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
           status: :not_found
  end

  def show
    card = Card.find(params[:id])
    render json: card.as_json(include: :comments)
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid card id provided" },
           status: :not_found
  end

  def update
    card = Card.find(params[:id])

    if card.update(card_params)
      render json: card.as_json
    else
      render json: { error: card.errors.full_messages.join(', ') },
             status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid card id provided" },
           status: :not_found
  end

  private

  def card_params
    params.require(:card).permit(
      :title, :list_id, :position, :description, :archived, :due_date,
      :completed
    )
  end
end
