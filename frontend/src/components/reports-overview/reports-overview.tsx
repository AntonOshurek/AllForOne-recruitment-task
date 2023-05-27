import { useEffect, useState } from 'react';
//components
import { Error, LoadMoreButton, Loading, ReportsList } from '..';
//api
import reportsApi from '../../api/reports-api';
//store
import { useAppDispatch } from '../../hooks/hooks';
import { setServerDataAction, setSortedDataAction } from '../../store/slices/app-slice';
//types
import type { IReportType } from '../../types/reports-type';
import type { IErrorInfo } from '../../types/types';
//styles
import './reports-overview.scss';

const ReportsOverview = (): JSX.Element => {
	const [reports, setReports] = useState<IReportType[] | []>([]);
	const [error, setError] = useState<IErrorInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useAppDispatch();

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

	useEffect(() => {
		dispatch(setServerDataAction({ serverData: reports }));
	}, [reports]);

	let content;

	if (error !== null) {
		content = <Error text={error.text} err={error.error}/>;
	} else if (loading === true) {
		content = <Loading/>;
	} else if(reports.length > 0) {
		content = <ReportsList/>;
	} else {
		content = <Error text={'Oops, something went wrong during page loading...'}/>;
	};

	return (
		<>
			{
				content
			}

			{
				error || loading ? null : <LoadMoreButton/>
			}
		</>

	);
};

export default ReportsOverview;
