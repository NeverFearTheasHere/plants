import noop from "lodash/noop"
import qs from "qs"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Platform } from "react-native";

const isWebClient = () => typeof window !== "undefined" && Platform.OS === 'web';

const parseQueryString = (queryString: string) => qs.parse(queryString.replace("?", ""));

type Options = {
  getSearch: () => string,
  getHash: () => string,
  getPathname: () => string,
  replaceState: History['replaceState'],
};

const defaultOptions = isWebClient() ? {
  getSearch: () => window.location.search,
  getHash: () => window.location.hash,
  getPathname: () => window.location.pathname,
  replaceState: window.history.replaceState.bind(window.history),
} : {
  getSearch: () => "",
  getHash: () => "",
  getPathname: () => "",
  replaceState: noop,
}

export const useUrlState = <T>(
  name: string,
  initialValue: T,
  decode: (value: any) => T | undefined = value => value,
  { getHash, getPathname, replaceState, getSearch }: Options = defaultOptions
): [T, Dispatch<SetStateAction<T>>] => {
  const queryString = isWebClient() ? window.location.search : "";
  const valueFromUrl = decode(parseQueryString(queryString)[name])

  const [value, setValue] = useState<T>(valueFromUrl !== undefined ? valueFromUrl : initialValue)

  useEffect(() => {
    const params = parseQueryString(getSearch())
    params[name] = value
    const search = `?${qs.stringify(params)}`
    replaceState({}, "", `${getPathname()}${search === "?" ? "" : search}${getHash()}`)
  }, [value])

  return [value, setValue]
}