import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Search, Menu } from 'lucide-react'

const videos = Array(12).fill({
  title: "Sample Video Title",
  views: "1.2M views",
  timestamp: "2 days ago",
  channel: "Channel Name",
  thumbnail: "https://via.placeholder.com/320x180",
})

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-60 bg-gray-100 fixed top-0 left-0 shadow-md hidden md:block">
      <NavigationMenu className="p-4">
        <NavigationMenuList className="space-y-4">
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("font-bold", "hover:text-blue-600")}>
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("hover:text-blue-600")}>Trending</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("hover:text-blue-600")}>Subscriptions</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("hover:text-blue-600")}>Library</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("hover:text-blue-600")}>History</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("hover:text-blue-600")}>Watch Later</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={cn("hover:text-blue-600")}>Liked Videos</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const VideoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos.map((video, index) => (
        <div key={index} className="w-full">
          <img
            src={video.thumbnail}
            alt="Thumbnail"
            className="rounded-lg w-full object-cover aspect-video"
          />
          <div className="mt-2">
            <h3 className="text-sm font-semibold truncate">{video.title}</h3>
            <p className="text-xs text-gray-500">{video.channel}</p>
            <p className="text-xs text-gray-500">
              {video.views} • {video.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-4 h-14 z-10">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="text-xl font-bold">BrandName</div>
      </div>
      <div className="flex-1 mx-4 hidden sm:block">
        <div className="relative max-w-lg mx-auto">
          <Input
            type="text"
            placeholder="Search"
            className="w-full pr-10"
          />
          <Button size="icon" className="absolute right-0 top-0">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
    </div>
  )
}

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex pt-14">
        <Sidebar />
        <div className="w-full md:ml-60">
          <Separator orientation="horizontal" className="mb-4" />
          <VideoGrid />
        </div>
      </div>
    </div>
  )
}

export default HomePage

