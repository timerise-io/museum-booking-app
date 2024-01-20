import { gql } from '@apollo/client';

export const SERVICE_QUERY = gql`
  query Service($serviceId: ID!, $slotType: SlotType!) {
    service(serviceId: $serviceId) {
      serviceId
      title
      description
      media {
        title
        url
      }
      slots(slotType: $slotType) {
        slotId
        dateTimeFrom
        dateTimeTo
        duration
        quantity
      }
    }
  }
`;

export const BOOKING_QUERY = gql`
  query Booking($bookingId: ID!) {
    booking(bookingId: $bookingId) {
      bookingId
      shortId
      shortUrl
      qrUrl
      status
    }
  }
`;
