/* eslint-disable no-undef */

export const fetchClient = async <R>(url: string, options: RequestInit = {}): Promise<R> => {
  const endpoint = `/api/${url}`;

  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    return response;
  }

  return response.json();
};
