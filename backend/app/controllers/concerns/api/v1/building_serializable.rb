module Api
  module V1
    module BuildingSerializable
      extend ActiveSupport::Concern

      include Rails.application.routes.url_helpers

      private

      def serialize_building_list_item(building)
        {
          id: building.id,
          name: building.name,
          location: building.location,
          image: attachment_url(building.image)
        }
      end

      def serialize_building_detail(building)
        serialize_building_list_item(building).merge(
          address: building.address,
          zip: building.zip,
          buildingType: building.building_type,
          description: building.description,
          additionalInfo: building.additional_info || [],
          apartments: building.apartments.map { |apartment| serialize_apartment(apartment) },
          generalPolicies: building.building_policies.map { |policy| serialize_policy(policy) }
        )
      end

      def serialize_building_admin(building)
        serialize_building_detail(building).merge(
          createdAt: building.created_at,
          updatedAt: building.updated_at,
          apartments: building.apartments.map { |apartment| serialize_apartment_admin(apartment) },
          generalPolicies: building.building_policies.map { |policy| serialize_policy_admin(policy) }
        )
      end

      def serialize_apartment(apartment)
        {
          unit: apartment.unit,
          price: apartment.price.to_f,
          layout: apartment.layout,
          image: attachment_url(apartment.image)
        }
      end

      def serialize_apartment_admin(apartment)
        serialize_apartment(apartment).merge(
          id: apartment.id,
          buildingId: apartment.building_id
        )
      end

      def serialize_policy(policy)
        {
          title: policy.title,
          note: policy.note
        }.compact
      end

      def serialize_policy_admin(policy)
        serialize_policy(policy).merge(
          id: policy.id,
          buildingId: policy.building_id
        )
      end

      def serialize_autocomplete_item(building)
        {
          id: building.id,
          name: building.name,
          location: building.location
        }
      end

      def attachment_url(attachment)
        return nil unless attachment.attached?

        rails_blob_url(attachment)
      end
    end
  end
end
