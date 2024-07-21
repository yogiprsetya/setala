import useSWR from 'swr';
import Error from 'next/error';
import { useCallback } from 'react';
import { contentType } from '~/schema/content-type';
import { fetchClient } from '~/services/fetch-client';
import { HttpRequest } from '~/@types/HttpRequest';

type ContentType = typeof contentType.$inferSelect;
type CreateParams = Pick<ContentType, 'name' | 'color'>;

type Options = {
  disabled?: boolean;
};

export const useContentTypeService = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<ContentType[]>, Error>(
    opt?.disabled ? null : 'content-type',
  );

  const createContentType = useCallback(
    async (form: CreateParams) => {
      const result = await fetchClient<HttpRequest<ContentType>>('content-type', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (result.success && data?.data) {
        mutate({ ...data, data: [...data.data, result.data] });
        return result;
      }

      return result;
    },
    [data, mutate],
  );

  return {
    dataContentTypes: data?.data || [],
    loadingContentTypes: isLoading,
    createContentType,
  };
};
