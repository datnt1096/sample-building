module Api
  module V1
    class BuildingsController < BaseController
      before_action :set_building, only: :show

      def index
        buildings = Building.ordered_by_name.with_attached_image

        render json: {
          buildings: buildings.map { |building| serialize_building_list_item(building) }
        }
      end

      def show
        render json: {
          building: serialize_building_detail(@building)
        }
      end

      def search
        query = params[:q].to_s.strip

        if query.blank?
          return render json: { buildings: [] }
        end

        buildings = Building.search_by_name(query).ordered_by_name
        buildings = buildings.with_attached_image unless autocomplete?

        if autocomplete?
          buildings = buildings.limit(autocomplete_limit)
          render json: {
            buildings: buildings.map { |building| serialize_autocomplete_item(building) }
          }
        else
          buildings = buildings.limit(search_limit)
          render json: {
            buildings: buildings.map { |building| serialize_building_list_item(building) }
          }
        end
      end

      private

      def set_building
        @building = Building
          .includes(:apartments, :building_policies)
          .with_attached_image
          .preload(apartments: { image_attachment: :blob })
          .find(params[:id])
      end

      def autocomplete?
        ActiveModel::Type::Boolean.new.cast(params[:autocomplete])
      end

      def autocomplete_limit
        params.fetch(:limit, 10).to_i.clamp(1, 50)
      end

      def search_limit
        params.fetch(:limit, 50).to_i.clamp(1, 100)
      end
    end
  end
end
