//types
import type { INewReportType, TemperatureUnit } from "../types/reports-type";

export class NewReport implements INewReportType {
	id?: string;
	temperature: number;
	unit: TemperatureUnit;
	city: string;
	date: string;

	constructor(newReport: INewReportType) {
		this.city = newReport.city;
		this.temperature = newReport.temperature;
		this.date = newReport.date;
		this.unit = newReport.unit;

		if (newReport.id) {
			this.id = newReport.id;
		};
	};
};
