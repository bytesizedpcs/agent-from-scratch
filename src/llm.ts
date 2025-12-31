import { openai } from './ai'
import type { AIMessage } from '../types'

interface LLMRunner {
  messages: AIMessage[]
}

export const runLLM = async ({ messages }: LLMRunner) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages,
  })

  return response.choices[0].message.content
}
