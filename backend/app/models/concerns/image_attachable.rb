module ImageAttachable
  extend ActiveSupport::Concern

  ALLOWED_IMAGE_CONTENT_TYPES = %w[image/png image/jpeg image/webp].freeze
  MAX_IMAGE_SIZE = 10.megabytes

  included do
    validate :image_must_be_attached
    validate :image_must_be_acceptable, if: -> { send(image_attachment_name).attached? }
  end

  private

  def image_attachment_name
    :image
  end

  def image_must_be_attached
    return if send(image_attachment_name).attached?

    errors.add(:image, "must be attached")
  end

  def image_must_be_acceptable
    blob = send(image_attachment_name).blob
    return if blob.nil?

    unless ALLOWED_IMAGE_CONTENT_TYPES.include?(blob.content_type)
      errors.add(:image, "must be a PNG, JPEG, or WebP")
    end

    return if blob.byte_size <= MAX_IMAGE_SIZE

    errors.add(:image, "must be smaller than 10 MB")
  end
end
