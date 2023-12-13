export async function conductInterviews(
  subjects: string[],
  interview: (subject: string) => Promise<string>,
  timeConstraint: number
): Promise<string[]> {
  const result: string[] = [];

  for (const subject of subjects) {
    let timeoutId: NodeJS.Timeout | null = null;
    try {
      const timeoutPromise = new Promise<string>((resolve, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error("Timeout")),
          timeConstraint
        );
      });

      const response = await Promise.race([interview(subject), timeoutPromise]);
      result.push(response);
    } catch (error) {
      if (error instanceof Error) {
        result.push(`Error: ${error.message}`);
      }
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }
  return result;
}
