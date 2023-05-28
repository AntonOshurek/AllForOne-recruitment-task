import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
//components
import UnitInput from './unit-input/unit-input';
//store
import { useAppDispatch } from '../../../../hooks/hooks';
import { deleteReportAction } from '../../../../store/slices/app-slice';
//api
import reportsApi from '../../../../api/reports-api';
//types
import type { IReportType } from '../../../../types/reports-type';
//vars
import { reportUnitValue } from '../../../../variables/variables';
//styles
import './card-edit.scss';

interface ICardEditProps {
	saveHndler: () => void,
	report: IReportType
};

const CardEdit = ({ saveHndler, report }: ICardEditProps): JSX.Element => {
	const {temperature, unit, city, date, id } = report;

	const dispatch = useAppDispatch();

	const [newUnit, setNewUnit] = useState<reportUnitValue>(unit);
	const [newTemp, setNewTemp] = useState<number>(+temperature);
	const [newCity, setNewCity] = useState<string>(city);
	const [newDate, setNewDate] = useState<string>(date);

	const [apiError, setApiError] = useState<string | null>(null);

	const onUnitInputHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
		setNewUnit(evt.target.value as reportUnitValue);
	};

	const onTemperatureInputHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
		setNewTemp(+evt.target.value);
	};

	const onCityInputHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
		setNewCity(evt.target.value);
	};

	const onDateInputHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
		setNewDate(evt.target.value);
	};

	const onSaveButtonHandler = (): void => {
		const changedReport: IReportType = {
			id: id,
			temperature: newTemp,
			unit: newUnit,
			city: newCity,
			date: dayjs(newDate).format('YYYY-MM-DD'),
		};

		reportsApi.updateReport(id, changedReport)
		.then((responce) => {
			//обновить стейт в app slice
			saveHndler();
		})
		.catch((error) => {
			setApiError(error);
		});
	};

	const onDeleteButtonHandler = (): void => {
		reportsApi.deleteReport(id)
		.then((responce) => {
			//удалить элемент из app slice
			dispatch(deleteReportAction({id}));
		})
		.catch((error) => {
			setApiError(error);
		});
	};

	return (
		<div className='card-edit'>

			<label className='card-edit__label'>
				<span className='card-edit__input-title'>Temperature</span>
				<input className='card-edit__input' type="number" value={newTemp} onChange={onTemperatureInputHandler}/>
			</label>

			<fieldset className="card-edit__unit">
				<figcaption className='visually-hidden'>Choice unit</figcaption>
				{
					<>
					<UnitInput unitValue={reportUnitValue.C} onChangeHandler={onUnitInputHandler} isChecked={newUnit === reportUnitValue.C}/>
					<UnitInput unitValue={reportUnitValue.F} onChangeHandler={onUnitInputHandler} isChecked={newUnit === reportUnitValue.F}/>
					<UnitInput unitValue={reportUnitValue.K} onChangeHandler={onUnitInputHandler} isChecked={newUnit === reportUnitValue.K}/>
					</>
				}
			</fieldset>

			<label className='card-edit__label'>
				<span className='card-edit__input-title'>City</span>
				<input className='card-edit__input' type="text" value={newCity} onChange={onCityInputHandler}/>
			</label>

			<input className='card-edit__date' type="date" value={newDate} onChange={onDateInputHandler}/>

			{
				apiError !== null ? <div className='card-edit__error'>{apiError}</div> : null
			}

			<div className='card-edit__controls'>
				<button className='card-edit__button' type='button' onClick={onSaveButtonHandler}>
					save
				</button>
				<button className='card-edit__button card-edit__button--delete' type='button' onClick={onDeleteButtonHandler}>delete</button>
			</div>
		</div>
	);
};

export default CardEdit;
