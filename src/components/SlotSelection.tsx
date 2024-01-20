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
    <div className="p-4">
      <h2 className="text-lg font-semibold">Select a Slot</h2>
      <ul>
        {data.service.slots.map((slot: { slotId: string, dateTimeFrom: Date }) => (
          <li key={slot.slotId} className="my-2">
            <button
              className={`p-2 border ${selectedSlot === slot.slotId ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => handleSlotSelect(slot.slotId)}>
              {new Date(slot.dateTimeFrom).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotSelection;
