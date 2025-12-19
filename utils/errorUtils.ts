// errorUtils.ts
// Centralized error utility for user-friendly error messages

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) return String((error as any).message);
  return 'An unexpected error occurred. Please try again.';
}
