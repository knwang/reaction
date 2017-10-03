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
    render json: card.as_json(include: [:comments, :actions])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid card id provided" },
           status: :not_found
  end

  def update
    card = Card.find(params[:id])
    card.assign_attributes(card_params)

    ActiveRecord::Base.transaction do
      create_actions(card) if card.valid?

      if card.save
        render json: card.as_json(include: :actions)
      else
        render json: { error: card.errors.full_messages.join(', ') },
              status: :unprocessable_entity
      end
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invalid card id provided" },
           status: :not_found
  end

  private

  def card_params
    params.require(:card).permit(
      :title, :list_id, :position, :description, :archived, :due_date,
      :completed, labels: []
    )
  end

  def create_actions(card)
    if card.due_date_changed?
      card.actions.create!(description: " changed the due date of this card")
    end

    if card.completed_changed?
      completion = card.completed ? "complete" : "incomplete"
      card.actions.create!(description: " marked the due date #{completion}")
    end

    if card.list_id_changed?
      old_list = List.find(card.list_id_was)

      if old_list.board == card.list.board
        card.actions.create!(
          description: "moved this card from #{old_list.title} to #{card.list.title}"
        )
      else
        card.actions.create!(
          description: "transferred this card from #{old_list.board.title}"
        )
      end
    end
  end
end
