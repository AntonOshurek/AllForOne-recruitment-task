export interface IReportType {
	id: string,
	temperature: number,
	unit: string,
	date: string,
	city: string,
};

export interface INewReportType {
	temperature: number,
	unit: string,
	date: string,
	city: string,
};

export interface INewSanitizeReportType {
  temperature: number;
  unit: string;
  date: string;
  city: string;
  [key: string]: string | number;
}

export interface IDbDataType {
	reports: IReportType[];
};
