import { vi } from 'vitest'

import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

// Qualquer evento que acontecer ( que dispará auma outra coisa em algum subdominio )
// na aplicação deverá ser representado por uma classe. Ex:
class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate

  constructor(aggrgate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggrgate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

// Simula uma entidade da aplicação... simula a respota de uma entidade
class CustomAggregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAggregate(null)

    // Registra que o evento aconteceu
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain event', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // CustomAggregateCreated.name) ou Class.name, retorna o nome da classe
    // Subscriber cadastrado ( ouvindo evento EX:"resposta criado" )
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma "Resposta" sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Estou assegurando que o evento foi criado porém Não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz oque precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
