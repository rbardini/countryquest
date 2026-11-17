import { RepeatClockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { type FormEvent, useCallback, useRef, useState } from 'react'
import { formatTypeError, Mnemonic, useEvolu } from '../lib/evolu'

type Props = {
  isOpen: boolean
  onClose(): void
}

export default function RestoreData({ isOpen, onClose }: Props) {
  const mnemonicFieldRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    isOpen: isRevealed,
    onOpen: onReveal,
    onClose: onHide,
  } = useDisclosure()
  const { restoreAppOwner } = useEvolu()

  const onFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setError('')
      setLoading(true)

      const formData = new FormData(event.currentTarget)
      const mnemonic = formData.get('mnemonic') as string
      const result = Mnemonic.from(mnemonic.trim())
      if (result.ok) {
        await restoreAppOwner(result.value)
        onClose()
      } else {
        const error = formatTypeError(result.error)
        setError(error)
      }

      setLoading(false)
    },
    [onClose, restoreAppOwner],
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={mnemonicFieldRef}
      isCentered
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent as="form" onSubmit={onFormSubmit}>
        <ModalCloseButton />
        <ModalHeader
          border={0}
          fontSize="lg"
          fontWeight="bold"
          paddingBlockStart={4}
        >
          Restore your data
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Text>
              Countryquest does not have access to your data since it&apos;s
              encrypted. Enter your backup phrase below to recover it or access
              it from this device:
            </Text>
            <FormControl isInvalid={!!error} isRequired>
              <InputGroup>
                <Input
                  ref={mnemonicFieldRef}
                  type={isRevealed ? 'text' : 'password'}
                  name="mnemonic"
                  placeholder="Your backup phrase"
                  disabled={loading}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={isRevealed ? 'Hide' : 'Reveal'}
                    icon={isRevealed ? <ViewOffIcon /> : <ViewIcon />}
                    size="sm"
                    onClick={isRevealed ? onHide : onReveal}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter border={0} paddingBlockEnd={6}>
          <Button
            leftIcon={<RepeatClockIcon />}
            disabled={loading}
            isLoading={loading}
            loadingText="Restoring..."
            type="submit"
          >
            Restore
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
