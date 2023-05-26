import { useEffect, useState } from 'react';
//components
import ReportsListItem from './reports-list-item/reports-list-item';
import { Error } from '../';
import { LoadMoreButton } from '../';
//api
import reportsApi from '../../api/reports-api';
//types
import type { IReportType } from '../../types/reports-type';
//styles
import './reports-list.scss';

const ReportsList = (): JSX.Element => {
	const [reports, setReports] = useState<IReportType[]>([]);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		reportsApi.getAllReports()
		.then((responce) => {
			setLoading(false);
			setReports(responce);
		})
		.catch((error) => {
			setError('Oops, something went wrong. We are unable to retrieve data from the server. Please contact your system administrator.');
		})
	}, []);

	let content;

	if (error) {
		content = <Error errText={error} />;
	} else if (loading === true) {
		content = <p>LOADING...</p>;
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

	// if(error) {
	// 	return <Error errText={error}/>
	// } else if(loading === true) {
	// 	return <p>LOADING...</p>
	// } else {
	// 	return (
	// 		reports.map((report: IReportType) => {
	// 			return <ReportsListItem report={report} key={report.id}/>
	// 		})
	// 	)
	// }

	// return (
	// 	<>
	// 		<ul className='reports-list'>

	// 			{
	// 				loading && <p>LOADING...</p>
	// 			}
	// 			{
	// 				error ? <Error errText={error}/> : reports.map((report: IReportType) => {
	// 					return <ReportsListItem report={report} key={report.id}/>
	// 				})
	// 			}
	// 		</ul>

	// 		<LoadMoreButton/>
	// 	</>
	// );
};

export default ReportsList;
