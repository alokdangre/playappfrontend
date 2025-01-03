import VideoGrid from '../components/video/VideoGrid'
import { Button } from '@/components/ui/button'
import { Gamepad2, Flame, Clock, Star, Music2, Film } from 'lucide-react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const categories = [
  { icon: Flame, label: 'Trending' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Music2, label: 'Music' },
  { icon: Film, label: 'Movies' },
  { icon: Clock, label: 'Recently Added' },
  { icon: Star, label: 'Popular' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-2 p-4">
              {categories.map(({ icon: Icon, label }) => (
                <Button key={label} variant="secondary" className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <VideoGrid />
      </div>
    </div>
  )
}

