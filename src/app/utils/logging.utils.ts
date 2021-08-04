export function logWithTimer(message: string) {
  console.log(`${new Date().toISOString()} ${message}`);
}
