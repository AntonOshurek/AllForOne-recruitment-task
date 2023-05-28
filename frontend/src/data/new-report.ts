//abstract classes
import AbstractReport from "./abstract-report";
//types
import type { INewReportType } from "../types/reports-type";

class NewReport extends AbstractReport {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(newReport: INewReportType) {
		super(newReport);
	};
};

export default NewReport;
