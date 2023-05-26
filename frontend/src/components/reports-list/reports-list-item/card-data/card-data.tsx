//styles
import { IReportType } from '../../../../types/reports-type';
import './card-data.scss';

interface ICardDataPropsType {
	report: IReportType
};

const CardData = ({ report }: ICardDataPropsType): JSX.Element => {
	const {temperature, unit, city, date } = report;

	return (
		<dl className='card-data'>
			<dt className='card-data-item card-data-item--title'>temperature</dt>
			<dd className='card-data-item card-data-item--value'>{temperature}</dd>

			<dt className='card-data-item card-data-item--title'>unit</dt>
			<dd className='card-data-item card-data-item--value'>{unit}</dd>

			<dt className='card-data-item card-data-item--title'>city</dt>
			<dd className='card-data-item card-data-item--value'>{city}</dd>

			<dt className='card-data-item card-data-item--title'>date</dt>
			<dd className='card-data-item card-data-item--value'>{date}</dd>
		</dl>
	);
};

export default CardData;
