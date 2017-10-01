class Card < ApplicationRecord
  include ActiveModel::Serializers::JSON

  belongs_to :list
  has_many :comments, dependent: :destroy

  validates_presence_of :title, :list_id

  delegate :board_id, to: :list

  def attributes
    super.merge("board_id" => list.board_id)
  end
end
