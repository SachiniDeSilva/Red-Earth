# Red Earth Kitchen

Restaurant website built with React and Vite, with a floating AI chat assistant powered by the Google Gemini API.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to your Google AI Studio API key.
3. Run `npm run dev` and open the local URL printed by Vite.

The development command starts both Vite and the chat API. Vite forwards `/api` requests to the local API server on port `3001`. The Gemini key is read by the server only and is never sent to the browser.

Optional server settings:

- `API_PORT` changes the API server port (default `3001`).
- `API_HOST` changes the API bind address (default `127.0.0.1`).
- `GEMINI_MODEL` changes the Gemini model (default `gemini-2.5-flash`).

For production, deploy the frontend and Node API together or configure the hosting platform to route `/api` requests to the Node server. Set `GEMINI_API_KEY` in the server's environment; do not add the real key to source control.

## Build and lint

- `npm run build`
- `npm run lint`
