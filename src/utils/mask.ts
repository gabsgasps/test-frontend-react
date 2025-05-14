import VMasker from 'vanilla-masker'

export enum MaskTypes {
  PHONE = '(99) 99999-9999',
  CPF = '999.999.999-99'
}

export function getMask(mask: 'phone' | 'cpf', value: string) {
  const masks = {
    phone: (value: string) => {
      return VMasker.toPattern(value, MaskTypes.PHONE)
    },
    cpf: (value: string) => {
      return VMasker.toPattern(value, MaskTypes.CPF)
    }
  }

  return masks[mask](value)
}
