module Api
  module V1
    module Admin
      class BuildingsController < BaseController
        before_action :set_building, only: %i[show update destroy]

        def index
          buildings = Building
            .includes(:apartments, :building_policies)
            .with_attached_image
            .preload(apartments: { image_attachment: :blob })
            .ordered_by_name

          render json: {
            buildings: buildings.map { |building| serialize_building_admin(building) }
          }
        end

        def show
          render json: {
            building: serialize_building_admin(@building)
          }
        end

        def create
          building = Building.new(building_params)

          if building.save
            render json: { building: serialize_building_admin(reload_building(building)) }, status: :created
          else
            render_validation_errors(building)
          end
        end

        def update
          if @building.update(building_params)
            render json: { building: serialize_building_admin(reload_building(@building)) }
          else
            render_validation_errors(@building)
          end
        end

        def destroy
          @building.destroy!

          head :no_content
        end

        private

        def set_building
          @building = Building
            .includes(:apartments, :building_policies)
            .with_attached_image
            .preload(apartments: { image_attachment: :blob })
            .find(params[:id])
        end

        def reload_building(building)
          Building
            .includes(:apartments, :building_policies)
            .with_attached_image
            .preload(apartments: { image_attachment: :blob })
            .find(building.id)
        end

        def building_params
          params.require(:building).permit(
            :name,
            :location,
            :address,
            :zip,
            :building_type,
            :description,
            :image,
            additional_info: [],
            apartments_attributes: %i[id unit price layout image _destroy],
            building_policies_attributes: %i[id title note _destroy]
          )
        end
      end
    end
  end
end
