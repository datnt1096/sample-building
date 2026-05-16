module Api
  module V1
    module Admin
      class BaseController < Api::V1::BaseController
        before_action :authenticate_admin!

        private

        def authenticate_admin!
          token = bearer_token
          secret = ENV["ADMIN_SECRET_TOKEN"].to_s

          authorized =
            token.present? &&
            secret.present? &&
            ActiveSupport::SecurityUtils.secure_compare(token, secret)

          return if authorized

          render json: { error: "Unauthorized" }, status: :unauthorized
        end

        def bearer_token
          header = request.authorization.to_s
          return nil unless header.match?(/\ABearer /i)

          header.sub(/\ABearer /i, "")
        end
      end
    end
  end
end
