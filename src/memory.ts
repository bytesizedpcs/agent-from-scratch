import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type MessageWithMetadata = AIMessage & {
  id: string
  created_at: string
}

type Data = {
  messages: MessageWithMetadata[]
}

const defaultData: Data = { messages: [] }

export const addMetadata = (message: AIMessage) => {
  return {
    ...message,
    id: uuidv4(),
    created_at: new Date().toISOString(),
  }
}

export const removeMetadata = (message: MessageWithMetadata) => {
  const { id, created_at, ...rest } = message
  return rest
}

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)
  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  try {
    const db = await getDb()
    db.data.messages.push(...messages.map(addMetadata))
    await db.write()
  } catch (e) {
    console.error(e)
  }
}

export const getMessages = async (): Promise<AIMessage[] | []> => {
  try {
    const db = await getDb()
    return db.data.messages.map(removeMetadata)
  } catch (e) {
    console.error(e)
    return []
  }
}
