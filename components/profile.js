import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import supabase from '../lib/supabase'

export default function Profile({ session }) {
  const { email } = session.user

  return (
    <Menu>
      <MenuButton as={IconButton} isRound>
        <Avatar size="sm" name={email} />
      </MenuButton>
      <MenuList>
        <MenuGroup title={email}>
          <MenuItem onClick={() => supabase.auth.signOut()}>Sign out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
