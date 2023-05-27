import { useEffect, useState } from 'react';
//components
import ReportsListItem from './reports-list-item/reports-list-item';
import { Error, LoadMoreButton, Loading } from '../';
//api
import reportsApi from '../../api/reports-api';
//types
import type { IReportType } from '../../types/reports-type';
//styles
import './reports-list.scss';

interface IErrorInfo {
	text: string,
	error: string,
};

const ReportsList = (): JSX.Element => {
	const [reports, setReports] = useState<IReportType[]>([]);
	const [error, setError] = useState<IErrorInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		reportsApi.getAllReports()
		.then((responce) => {
			setError(null);
			setLoading(false);
			setReports(responce);
		})
		.catch((error) => {
			const errorInfo: IErrorInfo = {
				text: 'Oops, something went wrong. We are unable to retrieve data from the server. Please contact your system administrator.',
				error: error.toString(),
			};

			setError(errorInfo);
		})
	}, []);

	let content;

	if (error !== null) {
		content = <Error text={error.text} err={error.error}/>;
	} else if (loading === true) {
		content = <Loading/>;
	} else {
		content = reports.map((report: IReportType) => {
			return <ReportsListItem report={report} key={report.id} />;
		});
	}

	return (
		<ul className='reports-list'>
			{content}

			{
				error || loading ? null : <LoadMoreButton/>
			}

		</ul>
	);

};

export default ReportsList;
