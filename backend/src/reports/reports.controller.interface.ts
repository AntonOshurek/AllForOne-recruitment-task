import { NextFunction, Response, Request } from 'express';

export interface IReportsController {
	getAllReports: (req: Request, res: Response, next: NextFunction) => void;
	getReport: (req: Request, res: Response, next: NextFunction) => void;
	addReport: (req: Request, res: Response, next: NextFunction) => void;
	updateReport: (req: Request, res: Response, next: NextFunction) => void;
	deleteReport: (req: Request, res: Response, next: NextFunction) => void;
};
