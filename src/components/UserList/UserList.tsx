'use client'

import {
  Button,
  CircularProgress,
  IconButton,
  List,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  Typography
} from '@mui/material'
import { IconFriendsOff, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '../../../services/user'
import { userService } from '../../../services/user.service'
import UserItem from './UserItem'

export default function UserList() {
  const router = useRouter()
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const [users, setUsers] = useState<Array<User>>()

  const goToHome = () => {
    router.push('/criar-ou-editar')
  }

  const getUsers = () => {
    const result = userService.indexUsers()
    setUsers(result)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const editUser = (email: string) => {
    router.push(`criar-ou-editar/${email}`)
  }

  const deleteUser = (email: string) => {
    const result = userService.deleteUser(email)
    if (result.success) {
      getUsers()
      setSnackbarMessage(`Usuário com email: ${email} removido!`)
    }
  }

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarMessage('')
  }

  return (
    <Stack
      gap={2}
      sx={{
        p: 2,
        height: '100%'
      }}
    >
      <Button
        sx={{ mb: 4 }}
        variant="contained"
        disableElevation
        onClick={goToHome}
      >
        Adicionar usuário
      </Button>
      {!!users?.length && (
        <List dense>
          {users?.map((user, key) => (
            <UserItem
              key={`${user}${key}`}
              user={user}
              onDelete={deleteUser}
              onEdit={editUser}
            />
          ))}
        </List>
      )}
      {users && !users?.length && (
        <Stack alignItems="center" justifyContent="center" gap={2}>
          <IconFriendsOff size={64} />
          <Typography
            component="span"
            variant="body2"
            sx={{ color: 'text.primary', display: 'inline' }}
          >
            Nenhum usuário encontrado
          </Typography>
        </Stack>
      )}
      {!users && (
        <Stack alignItems="center" justifyContent="center" gap={2}>
          <CircularProgress />
        </Stack>
      )}

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <IconX />
          </IconButton>
        }
      />
    </Stack>
  )
}
