import useSWR from 'swr';
import { HttpRequest } from '~/@types/HttpRequest';
import { type Tags } from '~/schema/tags';

type Options = {
  disabled?: boolean;
};

export const useTopicService = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<Tags[]>, Error>(
    opt?.disabled ? null : 'resource',
  );

  return {
    dataTopic: data?.data || [],
    loadingTopic: isLoading,
  };
};
