import useSWR from 'swr';
import { fetchClient } from '~/services/fetch-client';
import { HttpRequest } from '~/@types/HttpRequest';
import { IResource, Resource } from '~/schema/resource';
import { useCallback } from 'react';

type CreateParams = Omit<Resource, 'userId' | 'id' | 'createdAt' | 'updatedAt'>;

type Options = {
  disabled?: boolean;
};

export const useResources = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<IResource[]>, Error>(
    opt?.disabled ? null : 'resource',
  );

  const createResource = useCallback(
    async (form: CreateParams) => {
      if (!data?.data) return false;

      const result = await fetchClient<HttpRequest<IResource>>('resource', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (result.success) {
        mutate();
        return !!result.data;
      }

      return result.success;
    },
    [data, mutate],
  );

  return {
    dataResource: data?.data || [],
    loadingResource: isLoading,
    createResource,
  };
};
