import { injectable, inject } from "inversify";
import { v4 as uuid } from 'uuid';
//data
import { DBData } from "../db-data/db-data";
import { IDbDataType, INewSanitizeReportType, IReportType } from "../db-data/db-data.types";
//utils
import { sanitizeFields } from "../utils/utils";
//types
import { INewReportType } from "../db-data/db-data.types";

@injectable()
export class ReportsService {
	constructor() {};

	async getAll(): Promise<IDbDataType> {
		return DBData;
	};

	async getItem(id: string) {
    const result = DBData.reports.find(
			(report) => report.id === id
    );

		return result;
	};

	async add(sanitizedFields: INewReportType): Promise<IReportType[]> {
		DBData.reports.push({
			id: uuid(),
			...sanitizedFields,
		});

		return DBData.reports;
	};

	async update(body: INewSanitizeReportType, report_id: string): Promise<IReportType | undefined> {
		const reportIndex = DBData.reports.findIndex(
			(report) => report.id === report_id
		);

		if (reportIndex === -1) {
			return undefined;
		};

		const report = { ...DBData.reports[reportIndex], ...sanitizeFields(body) };
		DBData.reports[reportIndex] = report;

		return report;
	};

	async delete(report_id: string): Promise<boolean> {
		const findObjectById: boolean = DBData.reports.some(item => item.id === report_id);

		if(findObjectById) {
			DBData.reports = DBData.reports.filter(
				(report) => report.id !== report_id
			);
			return true;
		} else {
			return false
		};
	};
};
