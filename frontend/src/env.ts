if (typeof import.meta.env.VITE_API_URL !== "string" || !import.meta.env.VITE_API_URL) {
  throw new Error(`Env var 'API_URL' must be defined`);
}

export default {
  API_URL: import.meta.env.VITE_API_URL,
};
