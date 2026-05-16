class Apartment < ApplicationRecord
  include ImageAttachable

  belongs_to :building, inverse_of: :apartments

  has_one_attached :image

  validates :unit, presence: true, length: { maximum: 50 },
    format: { with: /\A[\w\-\.]+\z/i, message: "only allows letters, numbers, hyphens, and dots" },
    uniqueness: { scope: :building_id, case_sensitive: false }
  validates :layout, presence: true, length: { maximum: 100 }
  validates :price, presence: true,
    numericality: { greater_than: 0, less_than: 10_000_000 }
end
