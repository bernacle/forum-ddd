import { CreateQuestionUseCase } from './create-question'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

const fakeQuestionsRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('create an question', async ({ expect }) => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: 'any_id',
    title: 'any_title',
    content: 'any_content',
  })

  expect(question.content).toBe('any_content')
})
