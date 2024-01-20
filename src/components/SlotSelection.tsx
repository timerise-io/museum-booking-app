import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useQuery, useMutation } from '@apollo/client';
import { SERVICE_QUERY } from '../graphql/queries';
import { BOOKING_CREATE_MUTATION } from '../graphql/mutations';

const SlotSelection = ({ serviceId }: { serviceId: string }) => {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string|null>(null);
  const { loading, error, data } = useQuery(SERVICE_QUERY, {
    variables: { serviceId: serviceId, slotType: "AVAILABLE" },
  });
  const [createBooking, { data: bookingData, loading: bookingLoading, error: bookingError }] = useMutation(BOOKING_CREATE_MUTATION);

  if (loading || bookingLoading) return <p>Loading...</p>;
  if (error || bookingError) return <p>Error loading.</p>;

  const handleSlotSelect = async (slotId: string) => {
    setSelectedSlot(slotId);
    try {
      const { data } = await createBooking({
        variables: { serviceId, slots: [slotId] }
      });
      if (data.bookingCreate && data.bookingCreate.bookingId) {
        router.push(`/confirmation/${data.bookingCreate.bookingId}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      // Handle booking error
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-white-800 mb-4">Select a Slot</h2>
      <ul className="list-none space-y-3">
        {data.service.slots.map((slot: { slotId: string, dateTimeFrom: Date }) => (
          <li key={slot.slotId} className="flex justify-between items-center p-3 border rounded-lg shadow-sm">
            <span className="text-white-600">{new Date(slot.dateTimeFrom).toLocaleString()}</span>
            <button
              className={`px-4 py-2 rounded-lg text-black ${selectedSlot === slot.slotId ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => handleSlotSelect(slot.slotId)}>
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotSelection;
