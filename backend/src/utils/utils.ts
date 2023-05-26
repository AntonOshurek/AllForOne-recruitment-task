import {  Request } from 'express';
//types
import { IDbDataType, INewReportType, IReportType } from '../db-data/db-data.types';

export const validateFields = ( body: INewReportType): string[] => {
  const requiredFields: (keyof INewReportType)[] = ["temperature", "unit", "date", "city"];

  const missingFields = requiredFields.filter((field) => {
    if (field === "temperature" && body[field] === 0) return false;
    return !body[field];
  });
  return missingFields;
};

interface INewSanitizeReportType {
  temperature: number;
  unit: string;
  date: string;
  city: string;
  [key: string]: string | number; // Дополнительные свойства
}

export const sanitizeFields = (body: INewSanitizeReportType): INewReportType => {
  const initial: INewSanitizeReportType = {
    temperature: 0,
    unit: "",
    date: "",
    city: "",
  };

  const fields: (keyof INewSanitizeReportType)[] = ["temperature", "unit", "date", "city"];

  const sanitizedFields: INewSanitizeReportType = fields.reduce((acc, field) => {
    acc[field] = body[field];
    return acc;
  }, initial);
  return sanitizedFields;
};
