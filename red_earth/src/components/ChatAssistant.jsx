import { useEffect, useRef, useState } from 'react'
import './ChatAssistant.css'

const welcomeMessage = {
  role: 'assistant',
  content: "Hello! I'm the Red Earth Kitchen assistant. Ask me about our menu, opening hours, or reservations.",
}

const suggestions = [
  'What is on the menu?',
  'When are you open?',
  'Tell me about the degustation',
]

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messageListRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [isOpen, messages, isLoading, error])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  async function sendMessage(message = draft) {
    const content = message.trim()
    if (!content || isLoading) return

    const nextMessages = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setDraft('')
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((item) => item !== welcomeMessage)
            .slice(-20)
            .map(({ role, content: text }) => ({ role, content: text })),
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'The assistant could not respond. Please try again.')
      }

      setMessages((current) => [...current, { role: 'assistant', content: result.reply }])
    } catch (requestError) {
      setMessages(messages)
      setDraft(content)
      setError(requestError.message || 'Unable to reach the assistant. Please try again.')
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage()
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-assistant">
      {isOpen && (
        <section className="chat-panel" aria-label="Red Earth Kitchen chat assistant">
          <header className="chat-panel__header">
            <div className="chat-panel__identity">
              <span className="chat-panel__avatar" aria-hidden="true">R</span>
              <div>
                <h2>Red Earth Kitchen</h2>
                <p><span className="chat-panel__status" /> AI assistant</p>
              </div>
            </div>
            <button
              className="chat-panel__close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chat-panel__messages" ref={messageListRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`chat-message chat-message--${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="chat-panel__suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    disabled={isLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="chat-message chat-message--assistant chat-message--typing" role="status">
                <span /><span /><span />
                <span className="chat-panel__sr-only">Assistant is responding</span>
              </div>
            )}
            {error && <p className="chat-panel__error" role="alert">{error}</p>}
          </div>

          <form className="chat-panel__form" onSubmit={handleSubmit}>
            <label className="chat-panel__sr-only" htmlFor="chat-message">
              Ask Red Earth Kitchen a question
            </label>
            <textarea
              id="chat-message"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask us anything..."
              rows="1"
              maxLength="2000"
              disabled={isLoading}
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim() || isLoading}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12 20 4l-5 16-3-7-8-1Zm8 1 8-9" />
              </svg>
            </button>
          </form>
          <p className="chat-panel__disclaimer">AI can make mistakes. Please confirm details with our team.</p>
        </section>
      )}

      <button
        className="chat-assistant__launcher"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat assistant' : 'Chat with Red Earth Kitchen'}
      >
        {isOpen ? (
          <span aria-hidden="true">×</span>
        ) : (
          <>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.5-3.5A7.5 7.5 0 1 1 20 11.5Z" />
              <path d="M8 11h8M8 14h5" />
            </svg>
            <span>Ask us</span>
          </>
        )}
      </button>
    </div>
  )
}

export default ChatAssistant
