import MainForm from '@/components/MainForm/MainForm'
import { Container, Grid, Stack, Typography } from '@mui/material'

export default function HomePage() {
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
            Crie um usuário preenchendo as informações abaixo:
          </Typography>
          <MainForm />
        </Grid>
      </Container>
    </Stack>
  )
}
