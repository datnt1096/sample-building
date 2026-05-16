module Api
  module V1
    class BaseController < ApplicationController
      include BuildingSerializable

      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      private

      def record_not_found
        render json: { error: "Not found" }, status: :not_found
      end

      def render_validation_errors(record)
        render json: { errors: record.errors.to_hash }, status: :unprocessable_entity
      end
    end
  end
end
