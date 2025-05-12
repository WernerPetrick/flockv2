class SubmissionsController < ApplicationController
  before_action :require_login

  def index
    submissions = current_user.submissions.order(created_at: :desc).with_attached_photos
    render inertia: "Submissions/Index", props: {
      submissions: submissions.map do |submission|
        submission.as_json.merge(
          photo_url: submission.photos.attached? ? url_for(submission.photos.first.variant(:thumb)) : nil,
          bird_common_name: submission.bird&.common_name
        )
      end
    }
  end

  def new
    birds_for_select = Bird.order(:common_name).pluck(:common_name, :id)
    render inertia: "Submissions/New", props: {
      birds_for_select: birds_for_select,
      errors: flash[:errors] || {}
    }
  end

  def create
    all_submission_params = params.require(:submission).permit(
      :submitted_common_name,
      :notes,
      :location,
      photos: {}
    )

    photo_files = all_submission_params[:photos]&.values
    attributes_for_new = all_submission_params.except(:photos)

    @submission = current_user.submissions.new(attributes_for_new.merge(status: "pending"))

    if photo_files.present?
      @submission.photos.attach(photo_files)
    end

    if @submission.save
      SubmissionMailer.confirmation_email(@submission).deliver_later
      redirect_to submissions_path, notice: "Photo submission successful and is awaiting review."
    else
      Rails.logger.error "Submission save failed: #{@submission.errors.full_messages.join(', ')}"
      birds_for_select = Bird.order(:common_name).pluck(:common_name, :id)
      render inertia: "Submissions/New", props: {
        errors: @submission.errors.to_hash,
        birds_for_select: birds_for_select
      }, status: :unprocessable_entity
    end
  end

  private

  def submission_params
    params.require(:submission).permit(
      :submitted_common_name,
      :notes,
      :location,
      photos: {}
    )
  end
end
