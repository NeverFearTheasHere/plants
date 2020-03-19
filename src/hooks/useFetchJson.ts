import { useState, useEffect } from 'react';
import { fetchJson } from '../shared/fetchJson';

export const useFetchJson = <TResponseBody, TRequestBody = null>(
  url: string,
  httpMethod: 'get' | 'post' = 'get',
  requestBody: object = null
) => {
  const [data, setData] = useState<TResponseBody | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchJson(url, httpMethod, requestBody).then(json => {
      setData(json as TResponseBody);
      setLoading(false);
    });
  }, [url, httpMethod, requestBody]);

  return { data, loading };
};
