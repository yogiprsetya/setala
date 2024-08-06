import { useCallback } from 'react';
import useSWR from 'swr';

import { HttpRequest } from '~/@types/HttpRequest';
import { type Tags } from '~/schema/tags';
import { fetchClient } from './fetch-client';

type Options = {
  disabled?: boolean;
};

const ENDPOINT = 'tags';

export const useTagsService = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<Tags[]>, Error>(
    opt?.disabled ? null : ENDPOINT,
  );

  const createTag = useCallback(
    async (tag: string) => {
      if (!data?.data) return false;

      const result = await fetchClient<HttpRequest<Tags>>(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ tag }),
      });

      if (result.success) {
        mutate({ ...data, data: [...data.data, result.data] }, { revalidate: false });
        return !!result.data;
      }

      return result.success;
    },
    [data, mutate],
  );

  const deleteTag = useCallback(
    async (id: number) => {
      if (!data?.data) return false;

      const result = await fetchClient<HttpRequest<Tags>>(`${ENDPOINT}/${id}`, {
        method: 'DELETE',
      });

      if (result.success) {
        const newData = data.data.filter((tag) => tag.id !== id);
        mutate({ ...data, data: newData }, { revalidate: false });
        return !!result.data;
      }

      return result.success;
    },
    [data, mutate],
  );

  return {
    dataTags: data?.data ?? [],
    isTagsEmpty: !data?.data?.length,
    loadingTags: isLoading,
    createTag,
    deleteTag,
  };
};
