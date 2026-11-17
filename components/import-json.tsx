import {
  Button,
  Code,
  FormControl,
  FormHelperText,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useMultiStyleConfig,
  VStack,
} from '@chakra-ui/react'
import { type FormEvent, useCallback } from 'react'
import {
  countryIdToBrandedId,
  formatTypeError,
  sqliteFalse,
  useEvolu,
  type VisitsRow,
  type WishesRow,
} from '../lib/evolu'
import { toast } from '../lib/toast'
import UploadIcon from './upload-icon'

type Props = {
  isOpen: boolean
  onClose(): void
}

export default function ImportJSON({ isOpen, onClose }: Props) {
  const styles = useMultiStyleConfig('Button', {
    variant: 'outline',
  })
  const { upsert } = useEvolu()

  const onImport = useCallback(
    async (file: File) => {
      const content = await file.text()
      const json = JSON.parse(content) as {
        visits: VisitsRow[]
        wishes: WishesRow[]
      }

      json.visits.forEach(({ id }) => {
        const result = upsert('visits', {
          id: countryIdToBrandedId(id),
          isDeleted: sqliteFalse,
        })
        if (!result.ok) throw new Error(formatTypeError(result.error))
      })
      json.wishes.forEach(({ id }) => {
        const result = upsert('wishes', {
          id: countryIdToBrandedId(id),
          isDeleted: sqliteFalse,
        })
        if (!result.ok) throw new Error(formatTypeError(result.error))
      })

      onClose()
    },
    [onClose, upsert],
  )

  const onFormSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      const file = formData.get('file') as File

      toast.promise(onImport(file), {
        loading: {
          title: 'Importing your country list from JSON...',
        },
        success: {
          title: 'Country list imported from JSON',
        },
        error: {
          title: `Oops, we couldn't import your country list from JSON`,
        },
      })
    },
    [onImport],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent as="form" onSubmit={onFormSubmit}>
        <ModalCloseButton />
        <ModalHeader>Import your country list from JSON</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Text>
              Import your visits and travel wishlist from a JSON file. This will
              add all listed countries back to your map.
            </Text>
            <FormControl isRequired>
              <Input
                type="file"
                name="file"
                accept=".json"
                height="auto"
                padding="2"
                sx={{
                  '::file-selector-button': {
                    border: 'none',
                    fontFamily: 'inherit',
                    mr: 2,
                    size: 'xs',
                    ...styles,
                  },
                }}
              />
              <FormHelperText>
                Select a JSON (<Code fontSize="2xs">.json</Code>) file with your
                country list.
              </FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button leftIcon={<UploadIcon />} type="submit">
              Import
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
