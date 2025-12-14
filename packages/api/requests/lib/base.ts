import axios, { AxiosInstance } from "axios";

type HTTPMethodAttr<T, P = object> = {
  route: string;
  payload?: T;
  params?: P;
};

export function createClient(baseURL: string) {
  const client = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  return client;
}

export class Base {
  constructor(public readonly client: AxiosInstance) {}

  async get<T, R = void, P = object>(attr: HTTPMethodAttr<T, P>): Promise<R> {
    return this.client
      .get<R>(attr.route, {
        data: JSON.stringify(attr.payload),
        params: attr.params,
      })
      .then((response) => response.data);
  }
}
