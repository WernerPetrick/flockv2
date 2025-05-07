class SessionsController < Clearance::SessionsController
  def new
    render inertia: "Auth/SignIn"
  end

  def create
    @user = authenticate(params)
    sign_in(@user) do |status|
      if status.success?
        redirect_to profile_path
      else
        render inertia: "Auth/SignIn", props: { errors: { base: status.failure_message } }
      end
    end
  end
end
