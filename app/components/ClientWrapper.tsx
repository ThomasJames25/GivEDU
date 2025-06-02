'use client';

import React from 'react';
import Provider from '../Provider';
import Header from './Header';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Header />
      {children}
    </Provider>
  );
}