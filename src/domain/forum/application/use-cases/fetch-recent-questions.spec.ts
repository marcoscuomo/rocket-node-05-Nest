import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'

let inMemoryAttachmentsRepository: InMemoryAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryquestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: FetchRecentQuestionsUseCase
// ** sut, nome da classe principal do teste
// ** SUT -> system under test

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentRepository()
    inMemoryStudentsRepository = new InMemoryStudentRepository()
    inMemoryquestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryquestionAttachmentRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 20) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to fetch pagination recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
