import useSWR from 'swr';
import Error from 'next/error';
import { useCallback } from 'react';
import { Area, IAreaData } from '~/schema/area';
import { fetchClient } from '~/services/fetch-client';
import { HttpRequest } from '~/@types/HttpRequest';

type CreateParams = Pick<Area, 'name' | 'icon' | 'typeId'>;

type Options = {
  disabled?: boolean;
};

export const useAreaService = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<IAreaData[]>, Error>(
    opt?.disabled ? null : 'area',
  );

  const createArea = useCallback(
    async (form: CreateParams) => {
      if (!data?.data) return false;

      const result = await fetchClient<HttpRequest<IAreaData>>('area', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (result.success) {
        mutate({ ...data, data: [...data.data, result.data] });
        return !!result.data;
      }

      return result.success;
    },
    [data, mutate],
  );

  return {
    dataArea: data?.data || [],
    loadingArea: isLoading,
    createArea,
  };
};
