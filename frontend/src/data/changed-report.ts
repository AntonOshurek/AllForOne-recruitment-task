//abstract classes
import AbstractReport from "./abstract-report";
//types
import type { IReportType } from "../types/reports-type";

class ChangedReport extends AbstractReport {
	id: string;
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(changedReport: IReportType) {
		super(changedReport);
		this.id = changedReport.id;
	};
};

export default ChangedReport;
