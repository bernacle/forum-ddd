import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async ({ expect }) => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should be able to delete a question if you are not the author', async ({
    expect,
  }) => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        questionId: 'question-1',
        authorId: 'fake-author',
      }),
    ).rejects.toThrow('You are not the author of this question')
  })
})
