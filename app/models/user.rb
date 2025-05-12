class User < ApplicationRecord
  include Clearance::User
  has_many :submissions, dependent: :destroy
end
