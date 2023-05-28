import axios, { AxiosError, AxiosInstance } from "axios";
//types
import type { INewReportType, IReportType } from "../types/reports-type";

class ReportsApi {
	private REPORTS_API_INSTANCE: AxiosInstance;
	private REPORTS_API_URL: string;
	private REQUEST_TIMEOUT: number = 5000;

	constructor(apiUrl: string) {
		this.REPORTS_API_URL = apiUrl;

		this.REPORTS_API_INSTANCE = axios.create({
      baseURL: this.REPORTS_API_URL,
      params: {
				timeout: this.REQUEST_TIMEOUT,
      },
    });
	};

	async getAllReports(): Promise<IReportType[]> {
		try {
      const response = await this.REPORTS_API_INSTANCE.get(
				`reports`
			);

			if (response.status >= 200 && response.status < 300) {
				return response.data.reports;
			} else {
				return Promise.reject(new Error(response.statusText));
			};
		} catch(error) {
			if(error instanceof Error) {
				return Promise.reject(new Error(error.message));
			} else {
				return Promise.reject('somthing wrong in get all reports.');
			};
		}
	};

	async updateReport(reportId: string, changedReport: IReportType): Promise<IReportType> {
		try {
      const response = await this.REPORTS_API_INSTANCE.put(
				`reports/${reportId}`,
				changedReport
			);

			if (response.status >= 200 && response.status < 300) {
				return response.data;
			} else {
				return Promise.reject(new Error(response.statusText));
			};
		} catch(error) {
			if(error instanceof AxiosError) {
				return Promise.reject(error.request.response)
			} else {
				return Promise.reject('somthing wrong in update report.');
			};
		};
	};

	async deleteReport(reportId: string): Promise<void> {
		try {
			const response = await this.REPORTS_API_INSTANCE.delete(
				`reports/${reportId}`,
			);

			if (response.status >= 200 && response.status < 300) {
				return response.data;
			} else {
				return Promise.reject(new Error(response.statusText));
			};

		} catch (error) {
			if(error instanceof AxiosError && error.response?.data) {
				return Promise.reject(error.response?.data);
			} else {
				return Promise.reject('somthing wrong in delete report.');
			};
		};
	};

	async addReport(newReport: INewReportType): Promise<IReportType> {
		try {
			const response = await this.REPORTS_API_INSTANCE.post(
				`reports`,
				newReport
			);

			if (response.status >= 200 && response.status < 300) {
				return response.data;
			} else {
				return Promise.reject(new Error(response.statusText));
			};

		} catch (error) {
			if(error instanceof AxiosError && error.response?.data) {
				return Promise.reject(error.response?.data);
			} else {
				console.log(error)
				return Promise.reject('somthing wrong in add report.');
			};
		};
	};

};

const reportsApi = new ReportsApi('http://localhost:8000/api/');

export default reportsApi;
