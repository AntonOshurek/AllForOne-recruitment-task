import express, { Express } from "express";
import { Server } from 'http';
import { injectable, inject } from "inversify";
const cors = require('cors');
import 'reflect-metadata';
import { json } from 'body-parser';
//controllers
import { ReportsController } from "./reports/reports.controller";
//services
import { DatabaseService } from "./database/database.service";
//types
import type { ILogger } from "./logger/logger.interface";
//vars
import { TYPES } from "./types";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.Logger) private logger: ILogger,
		@inject(TYPES.ReportsController) private reportsController: ReportsController,
		@inject(TYPES.DatabaseService) private databaseService: DatabaseService,
	) {
		this.app = express();
		this.port = 8000;
	};

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(cors());
	};

	useRoutes(): void {
		this.app.use('/api', this.reportsController.router);
	};

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.databaseService.connect();

		this.server = this.app.listen(this.port);

		this.logger.log(`Server run in http://localhost:${this.port}`);
	};
};
