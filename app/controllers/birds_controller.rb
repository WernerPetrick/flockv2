class BirdsController < ApplicationController
  def index
    birds = Bird.all.map do |bird|
      bird.as_json.merge(
        image_url: bird.image.attached? ? url_for(bird.image) : nil
      )
    end

    render inertia: "Birds/Birds", props: { birds: birds }
  end


  def new
    render inertia: "Birds/New"
  end

  def create
    bird = Bird.new(bird_params)
    if bird.save
      render inertia: "Birds/Show", props: { bird: bird }
    else
      render inertia: "Birds/New", props: { errors: user.errors.to_hash }
    end
  end

  def show
    bird = Bird.find(params[:id])
    render inertia: "Birds/Show", props: {
      bird: bird.as_json.merge(
        image_url: bird.image.attached? ? url_for(bird.image) : nil
      )
    }
  end

  def edit
    bird = Bird.find(params[:id])
    render inertia: "EditBird", props: { bird: bird }
  end

  def update
    @bird = Bird.find(params[:id])
    attributes_to_update = bird_params.except(:image)

    if @bird.update(attributes_to_update)
      if params.dig(:bird, :image).is_a?(ActionDispatch::Http::UploadedFile)
        @bird.image.attach(params[:bird][:image])
      end

      # Add timestamp to force UI refresh
      updated_bird_props = @bird.as_json.merge(
        image_url: @bird.image.attached? ? url_for(@bird.image) : nil,
        updated_at_formatted: Time.now.to_i  # Add this to force props change
      )

      render inertia: "Birds/Show", props: {
        bird: updated_bird_props,
        flash: { success: "Bird was successfully updated." }
      }
    else
      error_bird_props = @bird.as_json.merge(
        image_url: @bird.image.attached? ? url_for(@bird.image) : nil
      )

      Rails.logger.debug("Bird update failed with errors: #{@bird.errors.full_messages}")

      render inertia: "Birds/Show", props: {
        bird: error_bird_props,
        errors: @bird.errors.to_hash,
        edit_mode: true
      }
    end
  end

  def destroy
    @bird = Bird.find(params[:id])
    @bird.destroy

    respond_to do |format|
      format.html { redirect_to birds_url, notice: "Bird was successfully deleted." }
    end
  end

  private

  def bird_params
    params.require(:bird).permit(:common_name, :scientific_name, :description, :habitat, :size, :image)
  end
end
