import { AxiosError } from 'axios';

export interface CustomError extends Error {
  details: string;
}

export type AxiosCustomError = AxiosError<CustomError>;
