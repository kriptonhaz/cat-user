export async function loadEnv() {
  const response = await fetch("/env.json")
  if (!response.ok) {
    throw new Error(`Failed to load environment variables: ${response.statusText}`)
  }
  return response.json()
}
