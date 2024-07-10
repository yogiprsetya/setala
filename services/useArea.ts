import useSWR from 'swr';
import Error from 'next/error';
import { useCallback } from 'react';
import { area } from '~/schema/area';
import { fetchClient } from '~/services/fetchClient';
import { HttpRequest } from '~/@types/HttpRequest';

type Area = typeof area.$inferSelect;
type CreateParams = Pick<Area, 'name' | 'icon' | 'typeId'>;

type Options = {
  disabled?: boolean;
};

export const useArea = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<Area[]>, Error>(
    opt?.disabled ? null : 'area',
  );

  const createArea = useCallback(
    async (form: CreateParams) => {
      if (!data?.data) return false;

      const result = await fetchClient<HttpRequest<Area>>('area', {
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
