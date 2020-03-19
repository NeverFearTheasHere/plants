export const fetchJson = async <TResponseBody, TRequestBody = null>(
  url: string,
  httpMethod: 'get' | 'post' = 'get',
  requestBody: object = null
): Promise<TResponseBody> => {
  const options = {
    method: httpMethod,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: requestBody == null ? undefined : JSON.stringify(requestBody),
  };

  const response = await fetch(url, options);
  const json = await response.json() as TResponseBody;
  return json;
};
