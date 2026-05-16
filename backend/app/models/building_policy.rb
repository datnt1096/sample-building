class BuildingPolicy < ApplicationRecord
  belongs_to :building, inverse_of: :building_policies

  validates :title, presence: true, length: { maximum: 255 }
  validates :note, length: { maximum: 2_000 }, allow_blank: true
end
