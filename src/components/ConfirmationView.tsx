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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-white-800 mb-4">BOOKING {data.booking.status}</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
        <p className="text-center text-gray-600 mb-2">ID: <span className="text-gray-800 font-semibold">{data.booking.shortId}</span></p>
        <div className="text-center">
          <img src={data.booking.qrUrl} alt="QR Code" className="w-32 h-32 inline-block mb-3" />
          <p className="text-sm text-gray-600">Scan this QR code at the entrance</p>
        </div>
        <a href={data.booking.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-center block mt-4">
          View booking page
        </a>
      </div>
    </div>
  );
};

export default ConfirmationView;
