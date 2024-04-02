import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async ({ expect }) => {
    const newAnswer = makeAnswer({}, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: newAnswer.authorId.toString(),
      content: 'Updated content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Updated content',
    })
  })

  it('should be able to edit a answer if you are not the author', async ({
    expect,
  }) => {
    const newAnswer = makeAnswer({}, new UniqueEntityID('answer-1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(
      sut.execute({
        answerId: 'answer-1',
        authorId: 'fake-author',
        content: 'Updated content',
      }),
    ).rejects.toThrow('You are not the author of this answer')
  })
})
