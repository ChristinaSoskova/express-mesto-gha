class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
export default NotFound;
