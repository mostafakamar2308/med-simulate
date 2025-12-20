import axios, { AxiosInstance } from "axios";

type HTTPMethodAttr<T, P = object> = {
  route: string;
  payload?: T;
  params?: P;
};

export function createClient(
  baseURL: string,
  getToken?: () => Promise<string | null>
) {
  const client = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(async (req) => {
    if (getToken) {
      const token = await getToken();

      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }
    return req;
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

  async post<T, R = void, P = object>(attr: HTTPMethodAttr<T, P>): Promise<R> {
    return this.client
      .post(attr.route, attr.payload ? JSON.stringify(attr.payload) : undefined)
      .then((response) => response.data);
  }
}
