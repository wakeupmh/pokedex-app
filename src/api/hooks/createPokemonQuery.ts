import { useQuery } from '@tanstack/react-query'

export const POKEMON_STALE_TIME = 10 * 60 * 1000

export function createDetailQuery<T>(
  key: (id: number | string) => readonly unknown[],
  fetcher: (id: number | string) => Promise<T>,
) {
  return (id: number | string | undefined) =>
    useQuery({
      queryKey: key(id!),
      queryFn: () => fetcher(id!),
      staleTime: POKEMON_STALE_TIME,
      enabled: !!id,
    })
}
