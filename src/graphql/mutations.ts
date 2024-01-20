import { gql } from '@apollo/client';

export const BOOKING_CREATE_MUTATION = gql`
  mutation BookingCreate($serviceId: ID!, $slots: [ID]) {
    bookingCreate(serviceId: $serviceId, slots: $slots) {
      bookingId
      qrUrl
      shortUrl
      status
    }
  }
`;
