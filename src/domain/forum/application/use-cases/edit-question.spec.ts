import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: newQuestion.authorId.toString(),
      title: 'Updated title',
      content: 'Updated content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated title',
      content: 'Updated content',
    })
  })

  it('should be able to edit a question if you are not the author', async ({
    expect,
  }) => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(
      sut.execute({
        questionId: 'question-1',
        authorId: 'fake-author',
        title: 'Updated title',
        content: 'Updated content',
      }),
    ).rejects.toThrow('You are not the author of this question')
  })
})
