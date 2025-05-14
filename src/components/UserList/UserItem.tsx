import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { IconEdit, IconTrashFilled, IconUserFilled } from '@tabler/icons-react'
import { User } from '../../../services/user'

export default function UserItem({
  user,
  onDelete,
  onEdit
}: {
  user: User
  onEdit: (email: string) => void
  onDelete: (email: string) => void
}) {
  return (
    <ListItem
      key={user.email}
      secondaryAction={
        <Stack direction="row" gap={1}>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => onEdit(user.email)}
              edge="end"
              aria-label="edit"
            >
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton
              onClick={() => onDelete(user.email)}
              edge="end"
              aria-label="delete"
            >
              <IconTrashFilled />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <IconUserFilled />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={
          <Typography
            component="span"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: 'text.primary',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.cpfFormatted}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: 'text.primary',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.phoneFormatted}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: 'text.primary',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {user.email}
            </Typography>
          </Typography>
        }
      />
    </ListItem>
  )
}
