import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import supabase from '../lib/supabase'

export default function SignIn() {
  const emailFieldRef = useRef()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onFormSubmit = async event => {
    event.preventDefault()

    setError('')
    setMessage('')
    setLoading(true)

    const { error } = await supabase.auth.signIn({ email })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for the magic sign in link.')
      setEmail('')
    }

    setLoading(false)
  }

  return (
    <Popover initialFocusRef={emailFieldRef} placement="bottom-end">
      <PopoverTrigger>
        <Button colorScheme="blue" variant="outline">
          Sign in
        </Button>
      </PopoverTrigger>
      <PopoverContent as="form" onSubmit={onFormSubmit}>
        <PopoverCloseButton />
        <PopoverHeader
          border={0}
          fontSize="lg"
          fontWeight="bold"
          paddingBlockStart={4}
        >
          Sign in to save visits and more
        </PopoverHeader>
        <PopoverBody>
          <FormControl>
            <InputGroup>
              <Input
                ref={emailFieldRef}
                disabled={loading}
                isRequired
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                type="email"
                value={email}
              />
            </InputGroup>
            <FormHelperText>
              We’ll email you a magic link for a password-free sign in.
            </FormHelperText>
          </FormControl>
        </PopoverBody>
        <PopoverFooter border={0} paddingBlockEnd={6}>
          <VStack spacing={2}>
            <Button
              colorScheme="blue"
              disabled={loading}
              isFullWidth
              isLoading={loading}
              loadingText="Sending magic sign in link..."
              type="submit"
            >
              Send my magic sign in link
            </Button>
            {message && <Text color="green.400">{message}</Text>}
            {error && <Text color="red.400">{error}</Text>}
          </VStack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
