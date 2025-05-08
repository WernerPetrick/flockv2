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

  def explore
    current_bird = nil
    previous_bird = nil
    next_bird = nil
    random_bird = nil

    if params[:random]
      random_bird = Bird.order("RANDOM()").first
      if random_bird
        current_bird_id = random_bird.id
        current_bird = random_bird.as_json.merge(
          image_url: random_bird.image.attached? ? url_for(random_bird.image) : nil
        )
      end
    elsif params[:id]
      current_bird_id = params[:id].to_i
      current_bird_record = Bird.find_by(id: current_bird_id)

      if current_bird_record
        current_bird = current_bird_record.as_json.merge(
          image_url: current_bird_record.image.attached? ? url_for(current_bird_record.image) : nil
        )
      end
    end

    if current_bird_id
      prev_bird_record = Bird.where("id < ?", current_bird_id).order(id: :desc).first
      if prev_bird_record
        previous_bird = prev_bird_record.as_json.merge(
          image_url: prev_bird_record.image.attached? ? url_for(prev_bird_record.image) : nil
        )
      end

      next_bird_record = Bird.where("id > ?", current_bird_id).order(:id).first
      if next_bird_record
        next_bird = next_bird_record.as_json.merge(
          image_url: next_bird_record.image.attached? ? url_for(next_bird_record.image) : nil
        )
      end
    end

    if !current_bird && !random_bird
      fallback_bird = Bird.order("RANDOM()").first
      if fallback_bird
        random_bird = fallback_bird.as_json.merge(
          image_url: fallback_bird.image.attached? ? url_for(fallback_bird.image) : nil
        )
      end
    end

    Rails.logger.debug("EXPLORE DATA: currentBird=#{current_bird&.slice('id', 'common_name')}, " +
                     "previousBird=#{previous_bird&.slice('id', 'common_name')}, " +
                     "nextBird=#{next_bird&.slice('id', 'common_name')}")

    render inertia: "Birds/Explore", props: {
      currentBird: current_bird,
      randomBird: random_bird,
      previousBird: previous_bird,
      nextBird: next_bird
    }
  end

  private

  def bird_params
    params.require(:bird).permit(:common_name, :scientific_name, :description, :habitat, :size, :species, :image)
  end
end
