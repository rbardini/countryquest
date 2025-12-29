import { CopyIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  Code,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { use } from 'react'
import { useEvolu } from '../lib/evolu'

type Props = {
  isOpen: boolean
  onClose(): void
}

export default function BackupData({ isOpen, onClose }: Props) {
  const { appOwner } = useEvolu()
  const owner = use(appOwner)
  const { onCopy, hasCopied } = useClipboard(owner.mnemonic ?? '')
  const {
    isOpen: isRevealed,
    onOpen: onReveal,
    onClose: onHide,
  } = useDisclosure()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Backup your data</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Text>
              Countryquest does not have access to your data since it&apos;s
              encrypted. In order to recover it or access it from another
              device, store your backup phrase below somewhere safe:
            </Text>
            <Code padding={2}>
              {isRevealed
                ? owner.mnemonic
                : owner.mnemonic?.replace(/[a-z]/g, '•')}
            </Code>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button
              variant="ghost"
              leftIcon={isRevealed ? <ViewOffIcon /> : <ViewIcon />}
              onClick={isRevealed ? onHide : onReveal}
            >
              {isRevealed ? 'Hide' : 'Reveal'}
            </Button>
            <Button leftIcon={<CopyIcon />} onClick={onCopy}>
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
