export function truncateMessage(message: string, maxWords: number) {
  const words = message.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return message;
}
