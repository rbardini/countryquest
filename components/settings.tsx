import {
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  MoonIcon,
  RepeatClockIcon,
  SettingsIcon,
  SunIcon,
} from '@chakra-ui/icons'
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { type ComponentRef, useCallback, useRef } from 'react'
import BackupData from './backup-data'
import ClearData from './clear-data'
import ExportJSON from './export-json'
import ImportJSON from './import-json'
import RestoreData from './restore-data'
import UploadIcon from './upload-icon'

export default function Settings() {
  const { toggleColorMode } = useColorMode()
  const exportRef = useRef<ComponentRef<typeof ExportJSON>>(null)
  const onExportOpen = useCallback(() => exportRef.current?.show(), [])
  const {
    isOpen: isImportOpen,
    onOpen: onImportOpen,
    onClose: onImportClose,
  } = useDisclosure()
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

  return (
    <>
      <Menu>
        <MenuButton as={Button} leftIcon={<SettingsIcon />} variant="outline">
          Settings
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
          >
            Turn {useColorModeValue('on', 'off')} dark mode
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<DownloadIcon />} onClick={onExportOpen}>
            Export to JSON
          </MenuItem>
          <MenuItem icon={<UploadIcon />} onClick={onImportOpen}>
            Import from JSON
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
      <ExportJSON ref={exportRef} />
      <ImportJSON isOpen={isImportOpen} onClose={onImportClose} />
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
