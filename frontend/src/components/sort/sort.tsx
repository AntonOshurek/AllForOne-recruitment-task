import { useState } from 'react';
import { ChangeEvent } from 'react';
//components
import SortInput from './sort-input/sort-input';
//vars
import { SortAliases, SortTypesArray, SortTypes } from '../../variables/variables';
//types
import type { ISortType } from '../../types/sort-types';
//styles
import './sort.scss';

const Sort = (): JSX.Element => {
	const [sort, setSort] = useState<SortAliases>(SortAliases.SORT_BY_DEFAULT);

	const onSortInputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setSort(evt.target.value as SortAliases);
	};

	return (
		<div className='sort'>
			<form className='sort__fieldset'>
				<legend className='visually-hidden'>SORT</legend>

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
