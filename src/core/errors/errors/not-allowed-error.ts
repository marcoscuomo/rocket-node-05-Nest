import { UseCaseError } from '@/core/errors/use-case-error'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    // Forma de chamar o constructor da classe pai
    super('Not Allowed')
  }
}
