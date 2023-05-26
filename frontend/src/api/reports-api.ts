import axios, { AxiosInstance } from "axios";
//types
import type { IReportType } from "../types/reports-type";

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
				return Promise.reject('somthing wrong in getAllReports.');
			};
		}
	};

};

const reportsApi = new ReportsApi('http://localhost:8000/api/');

export default reportsApi;
