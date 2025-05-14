import UserList from '@/components/UserList/UserList'
import { Container, Grid, Stack } from '@mui/material'

export default function HomePage() {
  return (
    <Stack component="main" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm">
        <Grid size={12}>
          <UserList />
        </Grid>
      </Container>
    </Stack>
  )
}
