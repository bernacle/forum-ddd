import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}
interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    if (authorId !== answer.authorId.toString())
      throw new Error('You are not the author of this answer')

    answer.content = content
    await this.answersRepository.save(answer)

    return {
      answer,
    }
  }
}
