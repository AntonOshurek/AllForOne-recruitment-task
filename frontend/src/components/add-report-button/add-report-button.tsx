import { MouseEventHandler } from 'react';
//styles
import './add-report-button.scss';

const AddReportButton = (): JSX.Element => {
	const onAddReportBtnHandler: MouseEventHandler<HTMLButtonElement> = (evt): void => {
		console.log(evt.target);
	};

	return (
		<button className='add-report-button' type='button' onClick={onAddReportBtnHandler}>
			+ ADD NEW REPORT
		</button>
	);
};

export default AddReportButton
