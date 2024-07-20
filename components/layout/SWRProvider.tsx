'use client';

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { fetchClient } from '~/services/fetch-client';

export const SWRProvider = ({ children }: { children: ReactNode }) => (
  <SWRConfig
    value={{
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fetcher: fetchClient,
    }}
  >
    {children}
  </SWRConfig>
);
