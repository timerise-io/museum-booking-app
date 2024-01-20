import React from 'react';
import { useQuery } from '@apollo/client';
import { BOOKING_QUERY } from '@/graphql/queries';

const ConfirmationView = ({ bookingId }: { bookingId: string }) => {
  const { loading, error, data } = useQuery(BOOKING_QUERY, {
    variables: { bookingId: bookingId },
  });

  if (loading) return <p>Loading booking...</p>;
  if (error) return <p>Error loading booking.</p>;
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Booking status: {data.booking.status}</h2>
      <p className="my-2">Booking ID: {data.booking.shortId}</p>
      <div className="my-2">
        <img src={data.booking.qrUrl} alt="QR Code" className="w-32 h-32" />
      </div>
      <a href={data.booking.shortUrl} target="_blank" className="text-blue-500">View booking page</a>
    </div>
  );
};

export default ConfirmationView;
