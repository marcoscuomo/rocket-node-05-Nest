import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    // Forma de chamar o constructor da classe pai
    super('Resource not found')
  }
}
