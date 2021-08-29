import {
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import supabase from '../lib/supabase'
import Avatar from './avatar'

type Props = {
  user: User
}

export default function Profile({ user }: Props) {
  return (
    <Menu>
      <MenuButton as={IconButton} isRound>
        <Avatar user={user} />
      </MenuButton>
      <MenuList>
        <MenuGroup title={user.email}>
          <MenuItem onClick={() => supabase.auth.signOut()}>Sign out</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
