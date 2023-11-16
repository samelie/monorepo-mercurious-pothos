import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../server/routers/router';
import { transformer } from '../transformer';

let token = ''
export function setAuthorization(t: string) {
  token = t
}

export function createTRPCClient(url: string) {
  const client = createTRPCProxyClient<AppRouter>({
    transformer,
    links: [
      httpBatchLink({
        url,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            // credentials: 'include',
          });
        },
        // You can pass any HTTP headers you wish here
        async headers() {
          return {
            authorization: token
          };
        },
      }),
    ],
  });
  return client
}