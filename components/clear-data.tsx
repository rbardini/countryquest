import { DeleteIcon, DownloadIcon } from '@chakra-ui/icons'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useEvolu } from '../lib/evolu'

type Props = {
  isOpen: boolean
  onClose(): void
  onBackupOpen(): void
}

export default function ClearData({ isOpen, onClose, onBackupOpen }: Props) {
  const { resetAppOwner } = useEvolu()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Clear local data from this device?</ModalHeader>
        <ModalBody>
          <Text>
            All data from the local database will be removed. Make sure to
            backup your data before proceeding.
          </Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button
              variant="ghost"
              leftIcon={<DownloadIcon />}
              onClick={() => (onClose(), onBackupOpen())}
            >
              Backup data
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<DeleteIcon />}
              onClick={() => resetAppOwner()}
            >
              Clear data
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
