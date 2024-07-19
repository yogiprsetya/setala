import useSWR from 'swr';
import { HttpRequest } from '~/@types/HttpRequest';
import { type Tags } from '~/schema/tags';

type Options = {
  disabled?: boolean;
};

export const useTagsService = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<Tags[]>, Error>(
    opt?.disabled ? null : 'tags',
  );

  return {
    dataTags: data?.data ?? [],
    loadingTags: isLoading,
  };
};
