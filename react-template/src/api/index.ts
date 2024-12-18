import { createQuery } from 'react-query-kit'
import request from '@/service/index'

interface GITHUB {
  owner: {
    archive_url: string
    login: string
  }
  full_name: string
  html_url: string
}
interface Variables { repo: string }

export const fetchGithubRepo = createQuery({
  queryKey: ['api/repos'],
  fetcher: ({ repo }: Variables) => request.get<GITHUB>(`api/repos/${repo}`),
})
