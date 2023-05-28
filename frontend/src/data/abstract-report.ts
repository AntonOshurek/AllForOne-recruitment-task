import { INewReportType, TemperatureUnit } from "../types/reports-type";

abstract class AbstractReport {
	temperature: number;
	unit: TemperatureUnit;
	city: string;
	date: string;

	constructor(newReport: INewReportType) {
		this.city = newReport.city;
		this.temperature = newReport.temperature;
		this.date = newReport.date;
		this.unit = newReport.unit;
	};
};

export default AbstractReport;
