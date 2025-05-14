'use client'

import { ErrorsType } from '@/utils/errors-type'
import { StoreManager } from './store-manager'
import { UserInterface, User } from './user'
import { sleep } from '@/utils/sleep'
import { initialData } from './initial-data'

export const STORAGE_KEY = 'USERS'

export class UserService {
  storage: StoreManager<UserInterface>
  constructor() {
    this.storage = new StoreManager(STORAGE_KEY, 'email')
    if (typeof window !== 'undefined') {
      const itemsFromStorage = this.storage.getItems()

      if (!itemsFromStorage.length) {
        this.storage.saveData(initialData)
      }
    }
  }

  indexUsers(): Array<User> {
    return this.storage.getItems().map((user) => new User(user))
  }

  async createUser(user: UserInterface): Promise<User> {
    user.cpf = user.cpf.replace(/\D/g, '')
    user.phone = user.phone.replace(/\D/g, '')

    const userExists = this.storage.getOneItem(user.email)

    if (userExists) {
      throw new Error(ErrorsType.USER_EXISTS)
    }

    const data = this.storage.storeData(user)
    await sleep()
    return new User(data)
  }

  readUser(email: string): User {
    try {
      const user = this.storage.getOneItem(email)

      if (!user) {
        throw new Error(ErrorsType.USER_NOT_FOUND)
      }

      return new User(user)
    } catch (e) {
      throw e
    }
  }

  async editUser(email: string, data: UserInterface): Promise<User> {
    try {
      data.cpf = data.cpf.replace(/\D/g, '')
      data.phone = data.phone.replace(/\D/g, '')

      const user = this.storage.editItem(email, data)
      await sleep()

      return new User(user)
    } catch (e) {
      throw e
    }
  }

  deleteUser(email: string): {
    success: boolean
  } {
    try {
      const wasRemoved = this.storage.deleteData(email)

      if (!wasRemoved) {
        throw new Error(ErrorsType.USER_NOT_FOUND)
      }

      return { success: true }
    } catch (e) {
      throw e
    }
  }
}

const userService = new UserService()
export { userService }
