export default class RequestError extends Error {
  constructor(resp) {
    super(resp.problem);
    this.name = this.constructor.name;
    this.statusCode = resp.status;
    this.response = resp;
  }

  log = componentName => {
    console.error(
      `Error occur at ${componentName} with status ${this.statusCode} and response`,
      this.response,
    );
  };
}
