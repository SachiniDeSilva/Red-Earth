import 'dotenv/config'
import { createServer } from 'node:http'

const port = Number(process.env.API_PORT || 3001)
const host = process.env.API_HOST || '127.0.0.1'
const apiKey = process.env.GEMINI_API_KEY
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const maxBodySize = 32 * 1024
const maxMessages = 20
const maxMessageLength = 2000

const systemInstruction = `You are the friendly online assistant for Red Earth Kitchen, a restaurant at 42 Flinders Lane, Melbourne VIC 3000. Answer using only these verified details:

Menu:
- Grilled Dorade: $42, fresh grilled dorade with seasonal vegetables and pomegranate sauce.
- Slow Roasted Ham: $50, tender baked ham with red caviar and gourmet garnish.
- Seasonal Salad: $16, fresh seasonal vegetables with house dressing and herbs.
- Cured Meat Platter: $22, premium cured meats, salami, beef, and sausage.
- Gourmet Cupcakes: $12, artisan chocolate and vanilla cupcakes.
- Lemon Meringue Tart: $14, lemon tart with sweet meringue and vanilla ice cream.
- Premium Red Wine: $18, wines from local vineyards with cheese pairing.
- Craft Beer Selection: $8, craft beers freshly poured on tap.

The Winter 2026 degustation is seven courses and costs $145 per person; optional wine pairing is an additional $85. The described menu includes braised wallaby, Manjimup truffle, and Tasmanian sea urchin.

Opening hours: Monday and Tuesday closed; Wednesday and Thursday 5:30 pm–10:00 pm; Friday and Saturday 12:00 pm–10:30 pm; Sunday 12:00 pm–9:00 pm. The restaurant recommends booking at least one week ahead for busy weekends; walk-ins are welcome at the bar. Phone: (03) 9654 2211.

Be concise, warm, and helpful. Do not invent menu items, availability, reservation confirmations, dietary or allergen suitability, or other restaurant policies. If information is missing, say you are not sure and suggest contacting the restaurant by phone or using the reservations form on the website. For allergen or dietary questions, advise the guest to confirm directly with the restaurant.`

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(JSON.stringify(payload))
}

async function readJsonBody(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (Buffer.byteLength(body) > maxBodySize) {
      const error = new Error('Request body is too large.')
      error.statusCode = 413
      throw error
    }
  }

  try {
    return JSON.parse(body)
  } catch {
    const error = new Error('Request body must be valid JSON.')
    error.statusCode = 400
    throw error
  }
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > maxMessages) {
    return false
  }

  return messages.every((message) => (
    message
    && (message.role === 'user' || message.role === 'assistant')
    && typeof message.content === 'string'
    && message.content.trim().length > 0
    && message.content.length <= maxMessageLength
  ))
}

async function handleChat(request, response) {
  let payload
  try {
    payload = await readJsonBody(request)
  } catch (error) {
    sendJson(response, error.statusCode || 400, { error: error.message })
    return
  }

  if (!payload || !validateMessages(payload.messages)) {
    sendJson(response, 400, {
      error: `Send between 1 and ${maxMessages} messages, each no longer than ${maxMessageLength} characters.`,
    })
    return
  }

  if (!apiKey) {
    console.error('Chat request rejected: GEMINI_API_KEY is not configured.')
    sendJson(response, 503, { error: 'The chat assistant is not configured yet. Please try again later.' })
    return
  }

  const contents = payload.messages.slice(-maxMessages).map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  }))

  try {
    const upstreamResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { maxOutputTokens: 700, temperature: 0.5 },
        }),
        signal: AbortSignal.timeout(30000),
      },
    )

    if (!upstreamResponse.ok) {
      const providerError = await upstreamResponse.text()
      console.error(`Gemini API returned ${upstreamResponse.status}: ${providerError}`)
      sendJson(response, 502, { error: 'The assistant is temporarily unavailable. Please try again shortly.' })
      return
    }

    const result = await upstreamResponse.json()
    const reply = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim()

    if (!reply) {
      console.error('Gemini API returned no text response.')
      sendJson(response, 502, { error: 'The assistant could not prepare a reply. Please try again.' })
      return
    }

    sendJson(response, 200, { reply })
  } catch (error) {
    console.error('Gemini chat request failed:', error)
    sendJson(response, 502, { error: 'The assistant is temporarily unavailable. Please try again shortly.' })
  }
}

const server = createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, { ok: true, configured: Boolean(apiKey) })
    return
  }

  if (request.method === 'POST' && request.url === '/api/chat') {
    handleChat(request, response)
    return
  }

  sendJson(response, 404, { error: 'Not found.' })
})

server.listen(port, host, () => {
  console.log(`Red Earth chat API listening on http://${host}:${port}`)
  if (!apiKey) console.warn('GEMINI_API_KEY is not set; configure it in .env to enable chat replies.')
})
