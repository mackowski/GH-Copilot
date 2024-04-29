import OpenAI from 'openai'

export async function introOpenAi(openAiApiKey: string): Promise<string> {
  const openai = new OpenAI({ apiKey: openAiApiKey })

  const systemPrompt = 'Say Hello in Polish!'

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'Hello!' }
    ],
    model: 'gpt-3.5-turbo'
  })

  return completion.choices[0].message.content || 'No response'
}

export {}
