import OpenAI from 'openai'

export async function introOpenAi(
  openAiApiKey: string,
  systemPrompt: string,
  user: string
): Promise<string> {
  const openai = new OpenAI({ apiKey: openAiApiKey })

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: user }
    ],
    model: 'gpt-3.5-turbo'
  })

  return completion.choices[0].message.content || 'No response'
}

export {}
