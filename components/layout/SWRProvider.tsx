'use client';

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { fetchClient } from '~/services/fetchClient';

export const SWRProvider = ({ children }: { children: ReactNode }) => (
  <SWRConfig
    value={{
      refreshInterval: 0,
      fetcher: fetchClient,
    }}
  >
    {children}
  </SWRConfig>
);
