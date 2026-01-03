import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { type ComponentRef, useCallback, useRef } from 'react'
import supabase from '../lib/supabase'
import Avatar from './avatar'
import ExportJSON from './export-json'

type Props = {
  user: User
}

export default function Profile({ user }: Props) {
  const { toggleColorMode } = useColorMode()
  const exportRef = useRef<ComponentRef<typeof ExportJSON>>(null)
  const onExportOpen = useCallback(() => exportRef.current?.show(), [])

  return (
    <>
      <Menu>
        <MenuButton as={IconButton} isRound>
          <Avatar user={user} />
        </MenuButton>
        <MenuList>
          <MenuGroup title={user.email}>
            <MenuItem onClick={toggleColorMode}>
              Turn {useColorModeValue('on', 'off')} dark mode
            </MenuItem>
            <MenuItem onClick={onExportOpen}>Export to JSON</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => supabase.auth.signOut()}>
              Sign out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <ExportJSON ref={exportRef} />
    </>
  )
}
