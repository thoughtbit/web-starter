import { createFileRoute } from '@tanstack/react-router'
import Counter from '@/components/Counter'

export const Route = createFileRoute('/count')({
  component: Count,
})
function Count() {
  return (
    <Counter />
  )
}
