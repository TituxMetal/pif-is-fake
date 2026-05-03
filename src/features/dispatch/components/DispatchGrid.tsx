import { DispatchCard } from '~/features/dispatch/components/DispatchCard'
import type { DispatchCardEntry } from '~/lib/generation'

interface DispatchGridProps {
  cards: DispatchCardEntry[]
}

export const DispatchGrid = ({ cards }: DispatchGridProps) => {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {cards.map((card, index) => (
        <DispatchCard key={card.id} card={card} index={index + 1} />
      ))}
    </div>
  )
}
