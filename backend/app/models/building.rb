class Building < ApplicationRecord
  include ImageAttachable

  BUILDING_TYPES = %w[co-op rental condo other].freeze
  MAX_ADDITIONAL_INFO_ENTRIES = 50
  MAX_ADDITIONAL_INFO_ENTRY_LENGTH = 500

  has_many :apartments, dependent: :destroy, inverse_of: :building
  has_many :building_policies, dependent: :destroy, inverse_of: :building

  has_one_attached :image

  accepts_nested_attributes_for :apartments,
    allow_destroy: true,
    reject_if: :reject_apartment?

  accepts_nested_attributes_for :building_policies,
    allow_destroy: true,
    reject_if: :reject_policy?

  validates :name, presence: true, length: { maximum: 255 }
  validates :location, presence: true, length: { maximum: 255 }
  validates :building_type, presence: true, inclusion: { in: BUILDING_TYPES }
  validates :address, length: { maximum: 500 }, allow_blank: true
  validates :zip, length: { maximum: 100 }, allow_blank: true
  validates :description, length: { maximum: 10_000 }, allow_blank: true

  validates :apartments, associated: true
  validates :building_policies, associated: true

  validate :additional_info_must_not_contain_blank_entries
  validate :additional_info_entries_must_be_valid

  before_validation :normalize_building_type
  before_validation :compact_additional_info

  scope :ordered_by_name, -> { order(:name) }
  scope :search_by_name, lambda { |query|
    term = "%#{sanitize_sql_like(query.to_s.strip)}%"
    where("buildings.name ILIKE ?", term)
  }

  private

  def normalize_building_type
    return if building_type.blank?

    self.building_type = building_type.to_s.strip.downcase
  end

  def compact_additional_info
    self.additional_info = Array(additional_info).map { |entry| entry.to_s.strip }.reject(&:blank?)
  end

  def additional_info_must_not_contain_blank_entries
    return if additional_info.blank?

    return unless additional_info.any?(&:blank?)

    errors.add(:additional_info, "cannot contain blank entries")
  end

  def additional_info_entries_must_be_valid
    return if additional_info.blank?

    if additional_info.size > MAX_ADDITIONAL_INFO_ENTRIES
      errors.add(:additional_info, "cannot have more than #{MAX_ADDITIONAL_INFO_ENTRIES} entries")
    end

    if additional_info.any? { |entry| entry.length > MAX_ADDITIONAL_INFO_ENTRY_LENGTH }
      errors.add(:additional_info, "entries must be #{MAX_ADDITIONAL_INFO_ENTRY_LENGTH} characters or fewer")
    end
  end

  def reject_apartment?(attributes)
    destroy_flag = ActiveModel::Type::Boolean.new.cast(attributes["_destroy"])
    return false if destroy_flag

    attributes["unit"].blank? &&
      attributes["layout"].blank? &&
      attributes["price"].blank?
  end

  def reject_policy?(attributes)
    destroy_flag = ActiveModel::Type::Boolean.new.cast(attributes["_destroy"])
    return false if destroy_flag

    attributes["title"].blank? && attributes["note"].blank?
  end
end
