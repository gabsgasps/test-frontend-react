import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UserInterface } from '../user'
import { UserService } from '../user.service'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    })
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('UserService', () => {
  let userService: UserService
  const mockUser: UserInterface = {
    email: 'test@example.com',
    name: 'Test User',
    cpf: '12345678910',
    phone: '11993219021'
  }

  beforeEach(() => {
    localStorageMock.clear()
    userService = new UserService()
  })

  it('should create a new user', () => {
    const user = userService.createUser(mockUser)
    expect(user.email).toBe(mockUser.email)
    expect(user.name).toBe(mockUser.name)
  })

  it('should return all users', () => {
    userService.createUser(mockUser)
    const users = userService.indexUsers()
    expect(users.length).toBe(1)
    expect(users[0].email).toBe(mockUser.email)
  })

  it('should get a user by email', () => {
    userService.createUser(mockUser)
    const user = userService.readUser(mockUser.email)
    expect(user.email).toBe(mockUser.email)
  })

  it('should throw an error if user does not exist', () => {
    expect(() => userService.readUser('nonexistent@email.com')).toThrow(
      'user_not_found'
    )
  })

  it('should edit an existing user', () => {
    userService.createUser(mockUser)
    const updated = userService.editUser(mockUser.email, {
      ...mockUser,
      name: 'Updated Name'
    })

    expect(updated.name).toBe('Updated Name')
  })

  it('should delete an existing user', () => {
    userService.createUser(mockUser)
    const result = userService.deleteUser(mockUser.email)
    expect(result.success).toBe('User removed successfully!')
    expect(() => userService.readUser(mockUser.email)).toThrow('user_not_found')
  })

  it('should throw an error when deleting a nonexistent user', () => {
    expect(() => userService.deleteUser('nonexistent@email.com')).toThrow(
      'user_not_found'
    )
  })
})
