import { ChangeEvent, useState, useEffect } from 'react';
//store
import { useAppDispatch } from '../../hooks/hooks';
import { setCityFilterTypeAction } from '../../store/actions/app-actions';
//vars
import { FilterAliases } from '../../variables/variables';
//styles
import './filter.scss';

const Filter = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const [cityFilter, setCityFilter] = useState<string>('');

	const onCityFilterInputHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
		setCityFilter(evt.target.value);
	};

	const onResetCityButtonHandler = (): void => {
		if(cityFilter.length > 0) {
			setCityFilter('');
		};
	};

	useEffect(() => {
		dispatch(setCityFilterTypeAction({city: cityFilter}))
	}, [cityFilter]);

	return (
		<form className='filter'>
			<h2 className='visually-hidden'>Filters</h2>
			<label className='filter__item'>
				<span className='filter__item-name'>FILTER BY CITY</span>
				<input className='filter__item-input' type="text" value={cityFilter} name={FilterAliases.FILTER_BY_CITY} onChange={onCityFilterInputHandler}/>
				<button className='filter__clear-button' type='button' onClick={onResetCityButtonHandler}>
					<span className='visually-hidden'>clear city filter</span>
					X
				</button>
			</label>

		</form>
	);
};

export default Filter;
