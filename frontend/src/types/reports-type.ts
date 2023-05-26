export interface IReportType {
	id: string;
	temperature: number;
	unit: TemperatureUnit;
	city: string;
	date: string;
};

export type TemperatureUnit = 'C' | 'K' | 'F';
