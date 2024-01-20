'use client'
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apolloClient';
import SlotSelection from "@/components/SlotSelection";

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <SlotSelection serviceId="E95rBw4j9Thhts2vzY1Y" />
    </ApolloProvider>
  );
};
