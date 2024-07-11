import useSWR from 'swr';
import Error from 'next/error';
import { useCallback } from 'react';
import { areaType } from '~/schema/area-type';
import { fetchClient } from '~/services/fetch-client';
import { HttpRequest } from '~/@types/HttpRequest';

type AreaType = typeof areaType.$inferSelect;
type CreateParams = Pick<AreaType, 'name' | 'color'>;

type Options = {
  disabled?: boolean;
};

export const useAreaTypeService = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<AreaType[]>, Error>(
    opt?.disabled ? null : 'area-type',
  );

  const createAreaType = useCallback(
    async (form: CreateParams) => {
      const result = await fetchClient<HttpRequest<AreaType>>('area-type', {
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
    dataAreaTypes: data?.data || [],
    loadingAreaTypes: isLoading,
    createAreaType,
  };
};
