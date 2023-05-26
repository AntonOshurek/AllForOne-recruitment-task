import { NextFunction, request, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
//abstract classes
import { BaseController } from '../common/base.controller';
//services
import { ReportsService } from './reports.service';
//utils
import { sanitizeFields, validateFields } from '../utils/utils';
//types
import type { IReportsController } from './reports.controller.interface';
import type { ILogger } from '../logger/logger.interface';
import type { INewSanitizeReportType, IReportType } from '../db-data/db-data.types';
//vars
import { TYPES } from '../types';

@injectable()
export class ReportsController extends BaseController implements IReportsController {
	constructor(
		@inject(TYPES.Logger) private loggerService: ILogger,
		@inject(TYPES.ReportsService) private reportsService: ReportsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/reports',
				method: 'get',
				func: this.getAllReports,
				// middlewares: [],
			},
			{
				path: '/reports',
				method: 'post',
				func: this.addReport,
				// middlewares: [],
			},
			{
				path: '/reports/:report_id',
				method: 'get',
				func: this.getReport,
				// middlewares: [],
			},
			{
				path: '/reports/:report_id',
				method: 'put',
				func: this.updateReport,
				// middlewares: [],
			},
			{
				path: '/reports/:report_id',
				method: 'delete',
				func: this.deleteReport,
				// middlewares: [],
			},
		]);
	};

	async getAllReports (req: Request,	res: Response,	next: NextFunction): Promise<void>  {
		this.loggerService.log(`${req.method} - ${req.path}`);

		const result = await this.reportsService.getAll();

		if (!result) {
			res.status(404).json({ error: "Report id is required" });
			return;
		}

		this.ok(res, result);
	};

	async getReport (req: Request,	res: Response,	next: NextFunction): Promise<void>  {
		this.loggerService.log(`${req.method} - ${req.path}`);

		const result = await this.reportsService.getItem(req.params.report_id);

		if (!result) {
			res.status(404).json({ error: "Report not found" });
			return;
		}

		this.ok(res, result);
	};

	async addReport (req: Request,	res: Response,	next: NextFunction): Promise<void> {
		this.loggerService.log(`${req.method} - ${req.path}`);
		const {body} = req;

		const missingFields = validateFields(body);

    if (!body || missingFields.length > 0) {
			res.status(400).send("The following fields are required: " + missingFields.join(", "));
			return;
    }
    const sanitizedFields = sanitizeFields(body);

		const result: IReportType[] = await this.reportsService.add(sanitizedFields);

		this.ok(res, result);
	};

	async updateReport (req: Request,	res: Response,	next: NextFunction): Promise<void>  {
		this.loggerService.log(`${req.method} - ${req.path}`);

		if (!req.params.report_id) {
			res.status(400).json({ error: "Report id is required" });
			return;
		};

		const missingFields = validateFields(req.body);

		if (!req.body || missingFields.length > 0) {
			res.status(400).send("The following fields are required: " + missingFields.join(", "));
			return;
		};

		const result = await this.reportsService.update(req.body, req.params.report_id);

		if (result === undefined) {
			res.status(404).send("Report not found");
			return;
		};

		this.ok(res, result);
	};

	async deleteReport (req: Request,	res: Response,	next: NextFunction): Promise<void>  {
		this.loggerService.log(`${req.method} - ${req.path}`);

    if (!req.params.report_id) {
			res.status(400).json({ error: "Report id is required" });
			return;
		};

		const result = await this.reportsService.delete(req.params.report_id);

		if(result) {
			res.status(200).send("Report deleted");
		} else {
			res.status(400).json({ error: "Report is defined" });
		};
	};
};
