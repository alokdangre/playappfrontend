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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block w-60 bg-white border-r shadow-sm">
        <nav className="p-4 space-y-2">
          {categories.map(({ icon: Icon, label }) => (
            <Button
              key={label}
              variant="ghost"
              className="w-full justify-start text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Icon className="mr-3 h-5 w-5 text-gray-500" />
              {label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Categories Bar */}
        <div className="border-b bg-white">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-2 px-4 py-3">
              {categories.map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="secondary"
                  className="rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-200"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Video Grid */}
        <div className="p-4">
          <VideoGrid />
        </div>
      </div>
    </div>
  )
}
