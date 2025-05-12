class Bird < ApplicationRecord
  has_one_attached :image
  has_many :approved_submissions, -> { where(status: "approved") }, class_name: "Submission", dependent: :nullify
end
