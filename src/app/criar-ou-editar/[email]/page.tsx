import MainForm from '@/components/MainForm/MainForm'
import { Container, Grid, Stack, Typography } from '@mui/material'

export default async function HomePage({
  params
}: {
  params: { email: string }
}) {
  const { email } = await params

  return (
    <Stack component="main" alignItems="center" minHeight="100vh">
      <Container maxWidth="sm" sx={{ margin: 'auto' }}>
        <Grid size={12}>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              color: 'text.primary',
              mb: 6
            }}
          >
            Editando o usuário com email: {decodeURIComponent(email)}:
          </Typography>
          <MainForm email={decodeURIComponent(email)} />
        </Grid>
      </Container>
    </Stack>
  )
}
