import {
  CopyIcon,
  DeleteIcon,
  MoonIcon,
  RepeatClockIcon,
  SunIcon,
} from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { use } from 'react'
import { useEvolu } from '../lib/evolu'
import Avatar from './avatar'
import BackupData from './backup-data'
import ClearData from './clear-data'
import RestoreData from './restore-data'

export default function Settings() {
  const { toggleColorMode } = useColorMode()
  const {
    isOpen: isBackupOpen,
    onOpen: onBackupOpen,
    onClose: onBackupClose,
  } = useDisclosure()
  const {
    isOpen: isRestoreOpen,
    onOpen: onRestoreOpen,
    onClose: onRestoreClose,
  } = useDisclosure()
  const {
    isOpen: isClearOpen,
    onOpen: onClearOpen,
    onClose: onClearClose,
  } = useDisclosure()
  const { appOwner } = useEvolu()
  const owner = use(appOwner)

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} isRound aria-label="Settings">
          <Avatar name={owner.id} />
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
          >
            Turn {useColorModeValue('on', 'off')} dark mode
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<CopyIcon />} onClick={onBackupOpen}>
            Backup data
          </MenuItem>
          <MenuItem icon={<RepeatClockIcon />} onClick={onRestoreOpen}>
            Restore data
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<DeleteIcon />} onClick={onClearOpen}>
            Clear data
          </MenuItem>
        </MenuList>
      </Menu>
      <BackupData isOpen={isBackupOpen} onClose={onBackupClose} />
      <RestoreData isOpen={isRestoreOpen} onClose={onRestoreClose} />
      <ClearData
        isOpen={isClearOpen}
        onClose={onClearClose}
        onBackupOpen={onBackupOpen}
      />
    </>
  )
}
