'use client'

export class StoreManager<T> {
  private storagekey: string
  private fakePrimaryKey: keyof T
  private mapOfItems: Map<T[keyof T], T>

  constructor(key: string, fakePrimaryKey: keyof T) {
    this.storagekey = key
    this.fakePrimaryKey = fakePrimaryKey
    if (typeof window !== 'undefined') {
      this.mapOfItems = this.getItemInMap()
    } else {
      this.mapOfItems = new Map()
    }
  }

  storeData(data: T): T {
    this.mapOfItems.set(data[this.fakePrimaryKey], data)
    this.saveData([...this.mapOfItems.values()])
    return data
  }

  saveData(items: Array<T>): void {
    localStorage.setItem(this.storagekey, JSON.stringify(items))
  }

  getOneItem(key: T[keyof T]): T {
    return this.mapOfItems.get(key)!
  }

  private getItemInMap() {
    const itemsFromStorage = localStorage.getItem(this.storagekey)

    const itemsParsed = <Array<T>>JSON.parse(itemsFromStorage || '[]')

    return new Map(
      itemsParsed.map((property) => [property[this.fakePrimaryKey], property])
    )
  }

  getItems(): T[] {
    this.mapOfItems = this.getItemInMap()

    return [...this.mapOfItems.values()]
  }

  editItem(key: T[keyof T], data: T): T {
    const item = this.getOneItem(key)
    if (!item) {
      throw new Error(`key_not_exists`)
    }

    this.mapOfItems.set(key, { ...item, ...data })
    this.saveData([...this.mapOfItems.values()])
    return this.getOneItem(key)
  }

  deleteData(key: T[keyof T]): boolean {
    const wasRemoved = this.mapOfItems.delete(key)
    this.saveData([...this.mapOfItems.values()])
    return wasRemoved
  }
}
