module Api
  module V1
    class BuildingsController < BaseController
      MAX_LIMIT = 100

      before_action :set_building, only: :show

      def index
        buildings = Building.ordered_by_name.with_attached_image

        if search_query.present?
          buildings = buildings.search_by_name(search_query)
          buildings = buildings.limit(parsed_limit) if limit_param_present?
        end

        render json: {
          buildings: buildings.map { |building| serialize_building_list_item(building) }
        }
      end

      def show
        render json: {
          building: serialize_building_detail(@building)
        }
      end

      private

      def set_building
        @building = Building
          .includes(:apartments, :building_policies)
          .with_attached_image
          .preload(apartments: { image_attachment: :blob })
          .find(params[:id])
      end

      def search_query
        params[:q].to_s.strip
      end

      def limit_param_present?
        params.key?(:limit) && params[:limit].present?
      end

      def parsed_limit
        params[:limit].to_i.clamp(1, MAX_LIMIT)
      end
    end
  end
end
