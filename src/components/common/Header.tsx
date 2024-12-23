import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Upload, Menu, X, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthContext } from '../../context/AuthContext'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthContext()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2 text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">VidShare</span>
          </Link>
        </div>

        <div className="hidden flex-1 md:block md:max-w-xl">
          <form className="relative">
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-full pl-4 pr-10"
            />
            <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full px-3 text-muted-foreground">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex">
                <Link to="/upload">
                  <Upload className="h-5 w-5" />
                  <span className="sr-only">Upload</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/user/${user.username}`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/upload">Upload Video</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search and Menu */}
      {isMenuOpen && (
        <div className="border-t p-4 md:hidden">
          <form className="mb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search videos..."
                className="w-full pl-4 pr-10"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full px-3 text-muted-foreground">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
          <nav className="grid gap-2">
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link to="/notifications">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

