import { reportUnitValue } from "../variables/variables";

export interface IReportType {
	id: string;
	temperature: number;
	unit: TemperatureUnit;
	city: string;
	date: string;
};

export interface INewReportType {
	id?: string;
	temperature: number;
	unit: TemperatureUnit;
	city: string;
	date: string;
};

export type TemperatureUnit = reportUnitValue;
