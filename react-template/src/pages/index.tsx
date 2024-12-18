import { useAtomValue } from 'jotai'
import { createFileRoute } from '@tanstack/react-router'
import { counterAtom } from '@/atoms/counter'
import { fetchGithubRepo } from '@/api'

export const Route = createFileRoute('/')({
  component: Home,
})
function Content() {
  const count = useAtomValue(counterAtom)
  return (
    <div className="home">
      <div className="i-carbon-campsite inline-block text-4xl" />
      <p>
        <a rel="noreferrer" href="https://github.com/yang1206/react-template" target="_blank">
          Vitesse Lite for React
        </a>
      </p>
      <p>
        <em className="text-sm opacity-75">Opinionated Vite Starter Template</em>
      </p>
      <div className="py-4" />
      <p className="font-mono font-semibold">{count}</p>
    </div>
  )
}
function Home() {
  const { data, isLoading } = fetchGithubRepo({
    variables: { repo: 'yang1206/react-template' },
  })
  if (isLoading)
    return <div>Loading...</div>

  return (
    <>
      <Content />
      <a className="block" href={data?.html_url}>{data?.full_name}</a>
    </>
  )
}
