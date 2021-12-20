export interface IError {
    status: number;
    message: string;
    name: string;
  }
  
  class ApiError extends Error implements IError {
    public status = 500;
    constructor(msg: string, statusCode: number, name: string = 'ApiError') {
      super();
      this.message = msg;
      this.status = statusCode;
      this.name = name;
    }
  }
  
  export default ApiError;