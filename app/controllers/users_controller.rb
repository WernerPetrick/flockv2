class UsersController < Clearance::UsersController
  def new
    render inertia: "Auth/SignUp"
  end

  def create
    Rails.logger.debug "--------------------------------------------------"
    Rails.logger.debug "UsersController#create received params: #{params.inspect}"
    user = User.new(user_params)
    if user.save
      sign_in(user)
      render inertia: "User/Profile"
    else
      render inertia: "Auth/SignUp", props: { errors: user.errors.to_hash }
    end
  end

  def profile
    render inertia: "User/Profile"
  end

  def seen_birds
    render inertia: "User/SeenBirds"
  end

  def wishlist
    render inertia: "User/Wishlist"
  end

  def email_settings
    render inertia: "User/EmailSettings"
  end

  def authentication
    render inertia: "User/Authentication"
  end

  def submissions
    render inertia: "User/Submissions"
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
