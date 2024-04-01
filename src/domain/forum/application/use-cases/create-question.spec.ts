import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('create an question', async ({ expect }) => {
    const { question } = await sut.execute({
      authorId: 'any_id',
      title: 'any_title',
      content: 'any_content',
    })

    expect(question.id).toBeTruthy()
  })
})
