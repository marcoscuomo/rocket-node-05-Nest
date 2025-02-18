import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
