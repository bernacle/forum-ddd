import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questioncomment: QuestionComment): Promise<void> {
    this.items.push(questioncomment)
  }

  async delete(answer: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(index, 1)
  }
}
