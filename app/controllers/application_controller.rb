class ApplicationController < ActionController::Base
  include Clearance::Controller
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_current_user_prop

  private

  def set_current_user_prop
    @current_user_prop = current_user&.as_json(only: [ :id, :email ])
  end
end
