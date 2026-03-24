import { ArrowForwardIcon, SettingsIcon } from '@chakra-ui/icons'
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import packageJson from '../package.json'

type Props = {
  isOpen: boolean
  onClose(): void
}

export default function About({ isOpen, onClose }: Props) {
  const linkColor = useColorModeValue('purple.500', 'purple.200')

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>About</ModalHeader>
        <ModalBody>
          <VStack spacing={4} alignItems="start">
            <Text>
              Countryquest is a private scratch map with progression mechanics.
              Keep track of which places you have been, how much of the world
              you have conquered, and where to go next.
            </Text>
            <Text>
              You don&apos;t need an account to use Countryquest&mdash;your
              visits and wishes are stored locally, backed up and synced across
              devices using end-to-end encryption. All you have to do is save
              your backup phrase from{' '}
              <Text as="span" color="var(--chakra-colors-chakra-subtle-text)">
                <SettingsIcon boxSize={3} verticalAlign="baseline" /> Settings
              </Text>{' '}
              to avoid losing access to your data.
            </Text>
            <Text>
              Countryquest is{' '}
              <Link
                color={linkColor}
                href={packageJson.repository.url.replace(/\.git$/, '')}
                textDecoration="underline"
              >
                open-source
              </Link>{' '}
              and maintained by{' '}
              <Link
                color={linkColor}
                href={packageJson.author.url}
                textDecoration="underline"
              >
                {packageJson.author.name}
              </Link>
              .
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button rightIcon={<ArrowForwardIcon />} onClick={onClose}>
            Go to map
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
