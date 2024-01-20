'use client'
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../../lib/apolloClient';
import ConfirmationView from "@/components/ConfirmationView";

export default function Confirmation({ params }: { params: { bookingId: string } }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ConfirmationView bookingId={params.bookingId} />
    </ApolloProvider>
  );
};
