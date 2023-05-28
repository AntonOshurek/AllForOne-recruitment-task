import dayjs from 'dayjs';
//services
import { temperatureService } from '../../../../services';
//types
import type { IReportType } from '../../../../types/reports-type';
//vars
import { reportUnitValue } from '../../../../variables/variables';
//styles
import './card-data.scss';

interface ICardDataPropsType {
	report: IReportType
};

const CardData = ({ report }: ICardDataPropsType): JSX.Element => {
	const {temperature, unit, city, date } = report;

	return (
		<dl className='card-data'>
			{
				unit === reportUnitValue.K ?
				<>
					<dt className='card-data-item card-data-item--title'>temp-{unit}</dt>
					<dd className='card-data-item card-data-item--value'>{temperature}</dd>
				</>
				:
				<>
					<dt className='card-data-item card-data-item--title'>temp-K</dt>
					<dd className='card-data-item card-data-item--value'>{temperatureService.convertToKelvin(unit, +temperature)}</dd>
					<dt className='card-data-item card-data-item--title'>temp-{unit}</dt>
					<dd className='card-data-item card-data-item--value'>{temperature}</dd>
				</>
			}

			<dt className='card-data-item card-data-item--title'>city</dt>
			<dd className='card-data-item card-data-item--value'>{city}</dd>

			<dt className='card-data-item card-data-item--title'>date</dt>
			<dd className='card-data-item card-data-item--value'>{dayjs(date).format('YYYY-MM-DD')}</dd>
		</dl>
	);
};

export default CardData;
