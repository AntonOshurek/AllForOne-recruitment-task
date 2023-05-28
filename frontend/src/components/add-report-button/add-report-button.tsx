import { MouseEventHandler } from 'react';
//store
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setNewReport } from '../../store/slices/app-slice';
import { SelectorGetNewReport } from '../../store/selectors/app-selectors';
//vars
import { reportUnitValue } from '../../variables/variables';
//data
import NewReport from '../../data/new-report';
//styles
import './add-report-button.scss';

const AddReportButton = (): JSX.Element => {
	const newReportIsCreated = useAppSelector(SelectorGetNewReport);
	const dispatch = useAppDispatch();

	const onAddReportBtnHandler: MouseEventHandler<HTMLButtonElement> = (evt): void => {
		const newReport = {
			temperature: 0,
			unit: reportUnitValue.K,
			city: '',
			date: '',
		};

		if(newReportIsCreated === null) {
			dispatch(setNewReport({newReport: newReport}));
		};
	};

	return (
		<button className='add-report-button' type='button' onClick={onAddReportBtnHandler}>
			+ ADD NEW REPORT
		</button>
	);
};

export default AddReportButton
