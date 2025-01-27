import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const RegisterPage = () => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { register } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if ([fullname, username, email, password].some(field => field.trim() === '')) {
      setError('All fields are required')
      return
    }

    if (!avatar) {
      setError('Avatar file is required')
      return
    }

    const formData = new FormData()
    formData.append('fullname', fullname)
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('avatar', avatar)
    if (coverImage) {
      formData.append('coverImage', coverImage)
    }

    try {
      await register(formData)
      navigate('/')
    } catch (error) {
      console.log(error)
        setError('User already exists')
        setError('Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Register for VidShare</CardTitle>
          <CardDescription>Create a new account to start sharing videos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"></Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar (required)</Label>
              <Input
                id="avatar"
                type="file"
                onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image (optional)</Label>
              <Input
                id="coverImage"
                type="file"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage

