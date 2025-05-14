export interface UserInterface {
  name: string
  cpf: string
  phone: string
  email: string
}

export class User implements UserInterface {
  cpf: string
  email: string
  name: string
  phone: string
  constructor(data: {
    cpf: string
    email: string
    name: string
    phone: string
  }) {
    this.cpf = data.cpf
    this.email = data.email
    this.name = data.name
    this.phone = data.phone
  }

  get phoneFormatted() {
    const cleaned = this.phone.replace(/\D/g, '')

    if (cleaned.length === 11) {
      // Celular com DDD: (11) 91234-5678
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (cleaned.length === 10) {
      // Fixo com DDD: (11) 1234-5678
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }

    return this.phone
  }

  get cpfFormatted() {
    const cleaned = this.cpf.replace(/\D/g, '')

    if (cleaned.length !== 11) return this.cpf

    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
