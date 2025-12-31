import type { AIMessage } from '../types'
import { openai } from './ai'

interface LLMRunner {
  messages: AIMessage[]
  temperature?: number
  model?: string
}

export const runLLM = async ({
  model = '',
  messages,
  temperature = 0.1,
}: LLMRunner) => {
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
  })

  return response.choices[0].message
}
