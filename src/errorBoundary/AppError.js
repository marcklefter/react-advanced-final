export class AppError extends Error {
  constructor(message, boundaryId) {
    super(message);

    this.boundaryId = boundaryId;
  }
}