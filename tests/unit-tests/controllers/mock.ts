import { Request, Response } from 'express';

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  const mockRequest = () => {
    const req: Partial<Request> = {};
    return req;
  };
  
  const mockNext = () => {
    return jest.fn();
  };
  
  module.exports = { mockResponse, mockRequest, mockNext };