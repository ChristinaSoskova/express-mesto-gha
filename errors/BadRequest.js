class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export default BadRequest;
