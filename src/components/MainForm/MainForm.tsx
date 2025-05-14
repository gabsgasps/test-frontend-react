'use client'

import { ErrorsType } from '@/utils/errors-type'
import { getMask } from '@/utils/mask'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  TextField
} from '@mui/material'
import Button from '@mui/material/Button'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { UserInterface } from '../../../services/user'
import { userService } from '../../../services/user.service'
import { createUserSchema } from './create-user-schema'
import { sleep } from '@/utils/sleep'

export default function MainForm({ email }: { email?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const goToList = () => {
    router.push('/')
  }

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    mode: 'onChange',
    defaultValues: {
      cpf: '',
      email: '',
      name: '',
      phone: ''
    }
  })

  const getUser = useCallback(() => {
    const user = userService.readUser(email!)
    form.reset({
      cpf: user.cpfFormatted,
      email: user.email,
      name: user.name,
      phone: user.phoneFormatted
    })
    form.trigger()
  }, [form, email])

  useEffect(() => {
    if (email) {
      getUser()
    }
  }, [email, getUser])

  const onSubmit = async (data: UserInterface) => {
    try {
      setIsSubmitting(true)

      if (email) {
        await userService.editUser(email, data)
        setSnackbarMessage(`Usuário editado com sucesso!`)
        setIsSubmitting(false)
        return
      }

      await userService.createUser(data)
      setSnackbarMessage(`Usuário cadastrado com sucesso!`)
      await sleep()
      goToList()
    } catch (e: unknown) {
      const error = e as Error
      if (error.message === ErrorsType.USER_EXISTS) {
        setSnackbarMessage(`Usuário com email ${data.email} já existe`)
      }
      setIsSubmitting(false)
    }
  }

  const backHome = () => {
    goToList()
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
    <FormProvider {...form}>
      <Stack component="form" gap={2} onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, formState }) => (
            <TextField
              id="component-name"
              label="Nome completo [sem abreviações]"
              variant="standard"
              helperText={formState.errors?.['name']?.message}
              error={!!formState.errors?.['name']?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="cpf"
          control={form.control}
          render={({ field: { value, ...field }, formState }) => (
            <TextField
              variant="standard"
              type="tel"
              id="component-cpf"
              label="CPF"
              error={!!formState.errors?.['cpf']?.message}
              helperText={formState.errors?.['cpf']?.message}
              value={getMask('cpf', value || '')}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field: { value, ...field }, formState }) => (
            <TextField
              variant="standard"
              type="tel"
              id="component-phone"
              label="Telefone"
              error={!!formState.errors?.['phone']?.message}
              helperText={formState.errors?.['phone']?.message}
              value={getMask('phone', value || '')}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, formState }) => (
            <TextField
              variant="standard"
              type="email"
              id="component-email"
              label="Email"
              error={!!formState.errors?.['email']?.message}
              helperText={formState.errors?.['email']?.message}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={!form.formState.isValid && !isSubmitting}
          loading={isSubmitting}
        >
          {email ? 'Salvar' : 'Cadastrar'}
        </Button>
        <Button onClick={backHome} variant="outlined" disableElevation>
          Voltar
        </Button>
      </Stack>
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
    </FormProvider>
  )
}
