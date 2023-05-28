import { ChangeEvent, useState } from 'react';
import dayjs from 'dayjs';
//components
import UnitInput from '../reports-list/reports-list-item/card-edit/unit-input/unit-input';
//vars
import { reportUnitValue } from '../../variables/variables';
//data
import NewReport from '../../data/new-report';
//api
import reportsApi from '../../api/reports-api';
//store
import { useAppDispatch } from '../../hooks/hooks';
import { addNewReportAction, discardNewReportAction } from '../../store/slices/app-slice';
//types
import type { INewReportType } from '../../types/reports-type';
//styles
import './new-report.scss';

const NewReportItem = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const [newUnit, setNewUnit] = useState<reportUnitValue>(reportUnitValue.K);
	const [newTemp, setNewTemp] = useState<number>(0);
	const [newCity, setNewCity] = useState<string>('');
	const [newDate, setNewDate] = useState<string>('');

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
		const newReportItem: INewReportType = new NewReport({
			temperature: newTemp,
			unit: newUnit,
			city: newCity,
			date: dayjs(newDate).format('YYYY-MM-DD'),
		});

		reportsApi.addReport(newReportItem)
		.then((responce) => {
			dispatch(addNewReportAction({newReport: responce}));
			//disnew-card all data and delete add new item component from reports list
			dispatch(discardNewReportAction());
		})
		.catch((error) => {
			setApiError(error);
		});
	};

	const onCancelButtonHandler = (): void => {
		dispatch(discardNewReportAction());
	};

	return (
		<article className='new-card'>
			<div className="new-card__form">
				<div className="new-card__inner">

					<div className="new-card__control">
						<button type="button" className="new-card__btn" onClick={onCancelButtonHandler}>cancel</button>
					</div>

					<div className="new-card__color-bar">
						<svg className="new-card__color-bar-wave" aria-hidden='true' focusable='false' width="100%" height="10">
						</svg>
					</div>

					<div className='new-card-edit'>
						<label className='new-card-edit__label'>
							<span className='new-card-edit__input-title'>Temperature</span>
							<input className='new-card-edit__input' type="number" value={newTemp} onChange={onTemperatureInputHandler}/>
						</label>

						<fieldset className="new-card-edit__unit">
							<figcaption className='visually-hidden'>Choice unit</figcaption>
							{
								<>
								<UnitInput unitValue={reportUnitValue.C} onChangeHandler={onUnitInputHandler} isChecked={newUnit === reportUnitValue.C}/>
								<UnitInput unitValue={reportUnitValue.F} onChangeHandler={onUnitInputHandler} isChecked={newUnit === reportUnitValue.F}/>
								<UnitInput unitValue={reportUnitValue.K} onChangeHandler={onUnitInputHandler} isChecked={newUnit === reportUnitValue.K}/>
								</>
							}
						</fieldset>

						<label className='new-card-edit__label'>
							<span className='new-card-edit__input-title'>City</span>
							<input className='new-card-edit__input' type="text" value={newCity} onChange={onCityInputHandler}/>
						</label>

						<input className='new-card-edit__date' type="date" value={newDate} onChange={onDateInputHandler}/>

						{
							apiError !== null ? <div className='new-card-edit__error'>{apiError}</div> : null
						}

						<div className='new-card-edit__controls'>
							<button className='new-card-edit__button' type='button' onClick={onSaveButtonHandler}>
								create new report
							</button>
						</div>
						</div>

				</div>
			</div>
		</article>
	);
};

export default NewReportItem;
