import { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';
//components
import SortInput from './sort-input/sort-input';
//store
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setSortTypeAction } from '../../store/actions/app-actions';
import { SelectorGetSortType } from '../../store/selectors/app-selectors';
//vars
import { SortAliases, SortTypesArray, SortTypes } from '../../variables/variables';
//types
import type { ISortType } from '../../types/sort-types';
//styles
import './sort.scss';

const Sort = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const currentSortType = useAppSelector(SelectorGetSortType);

	const [sort, setSort] = useState<SortAliases>(currentSortType);

	const onSortInputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setSort(evt.target.value as SortAliases);
	};

	useEffect(() => {
		dispatch(setSortTypeAction({sortType: sort}));
	}, [sort]);

	return (
		<div className='sort'>
			<form className='sort__fieldset'>
				<h2 className='visually-hidden'>SORT</h2>

				<div className='sort__block'>

					{
						SortTypesArray.map((item: ISortType) => {
							const isChecked = sort === item.alias;

							if(item.type === SortTypes.SORT_DATE || item.type === SortTypes.SORT_DEFAULT) {
								return <SortInput name={item.name} value={item.alias} checked={isChecked} onChangeHandler={onSortInputHandler} key={item.alias}/>
							} else {
								return null;
							}
						})
					}
				</div>

				<div className='sort__block'>
				{
						SortTypesArray.map((item: ISortType) => {
							const isChecked = sort === item.alias;

							if(item.type === SortTypes.SORT_TEMP) {
								return <SortInput name={item.name} value={item.alias} checked={isChecked} onChangeHandler={onSortInputHandler} key={item.alias}/>
							} else {
								return null;
							}
						})
					}
				</div>

			</form>
		</div>
	);
};

export default Sort;
