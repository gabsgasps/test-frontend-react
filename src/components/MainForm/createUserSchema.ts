'use client'

import { z } from 'zod'

const createUserSchema = z.object({
  name: z
    .string({ message: 'Campo obrigatório' })
    .min(3, { message: 'Campo deve conter 3 caracteres ou mais' }),
  cpf: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido, ex: 000.000.000-00'),
  phone: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido, ex: (11) 99999-9999'),
  email: z
    .string({ message: 'Campo obrigatório' })
    .email({ message: 'Email inválido, ex: exemplo@gmail.com' })
})

export { createUserSchema }
