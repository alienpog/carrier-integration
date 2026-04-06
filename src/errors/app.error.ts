export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public status: number
  ) {
    super(message);
  }
}