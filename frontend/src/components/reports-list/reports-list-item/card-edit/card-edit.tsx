//types
import { IReportType } from '../../../../types/reports-type';
//styles
import './card-edit.scss';

interface ICardEditProps {
	saveHndler: () => void,
	report: IReportType
};

const CardEdit = ({ saveHndler, report }: ICardEditProps): JSX.Element => {
	const {temperature, unit, city, date } = report;

	const onSaveButtonHandler = () => {
		saveHndler();
	};

	return (
		<div className='card-edit'>

			<label className='card-edit__label'>
				<span className='card-edit__input-title'>Temperature</span>
				<input className='card-edit__input' type="number" value={temperature}/>
			</label>

			<fieldset className="card-edit__unit">
				<figcaption className='visually-hidden'>Choice unit</figcaption>
				<label className='card-edit__unit-label'>
					<span className='card-edit__unit-label-text'>C</span>
					<input className='card-edit__unit-input visually-hidden' type="radio" name='unit' value={'C'}/>
				</label>
				<label className='card-edit__unit-label'>
					<span className='card-edit__unit-label-text'>K</span>
					<input className='card-edit__unit-input visually-hidden' type="radio" name='unit' value={'K'}/>
				</label>
				<label className='card-edit__unit-label'>
					<span className='card-edit__unit-label-text'>F</span>
					<input className='card-edit__unit-input visually-hidden' type="radio" name='unit' value={'F'}/>
				</label>
			</fieldset>

			<label className='card-edit__label'>
				<span className='card-edit__input-title'>City</span>
				<input className='card-edit__input' type="text" value={city}/>
			</label>

			<input className='card-edit__date' type="date" value={date}/>

			<div className='card-edit__controls'>
				<button className='card-edit__button' type='button' onClick={onSaveButtonHandler}>save</button>
				<button className='card-edit__button card-edit__button--delete' type='button'>delete</button>
			</div>
		</div>
	);
};

export default CardEdit;
