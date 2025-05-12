class SubmissionMailer < ApplicationMailer
  default from: "submissions@flock.com"

  def confirmation_email(submission)
    @submission = submission
    @user = submission.user

    mail(to: @user.email, subject: "Your Bird Photo Submission Confirmation")
  end
end
