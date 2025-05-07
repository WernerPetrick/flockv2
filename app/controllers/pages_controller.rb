class PagesController < ApplicationController
  def index
    render inertia: "Index", props: {
      current_user: @current_user_prop
    }
  end
end
