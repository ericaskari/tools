export class RequestError {
  constructor(public code: number, public message: string, public description: { [reason: string]: string }) {}
}
