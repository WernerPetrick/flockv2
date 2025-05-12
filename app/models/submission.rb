class Submission < ApplicationRecord
  belongs_to :user
  belongs_to :bird, optional: true

  has_many_attached :photos do |attachable|
    attachable.variant :thumb, resize_to_limit: [ 100, 100 ]
    attachable.variant :medium, resize_to_limit: [ 300, 300 ]
  end

  validates :user, presence: true
  validates :photos, attached: true,
                     content_type: [ "image/png", "image/jpeg" ],
                     size: { less_than: 5.megabytes, message: "must be less than 5MB in size" }

  validate :photos_count_within_limit

  validates :status, inclusion: { in: %w[pending approved rejected], message: "%{value} is not a valid status" }

  scope :pending, -> { where(status: "pending") }
  scope :approved, -> { where(status: "approved") }
  scope :rejected, -> { where(status: "rejected") }

  private

  def photos_count_within_limit
    unless photos.attached?
      errors.add(:photos, "must be uploaded.")
      return
    end

    if photos.count > 5
      errors.add(:photos, "can't be more than 5.")
    end
  end
end
