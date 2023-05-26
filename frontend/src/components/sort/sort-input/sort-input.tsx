import { ChangeEvent } from "react";
//vars
import { SortAliases } from "../../../variables/variables";
//styles
import './sort-input.scss';

interface ISortInputPropsType {
	name: string,
	value: SortAliases,
	checked: boolean,
	onChangeHandler: (evt: ChangeEvent<HTMLInputElement>) => void
};

const SortInput = ({name, value, checked, onChangeHandler}: ISortInputPropsType):JSX.Element => {
	return (
		<label className='sort-input unselectable'>
			<input className='sort-input__field visually-hidden'
			type="radio"
				name='sort'
				value={value}
				checked={checked}
				onChange={onChangeHandler}
			/>
			<span className='sort-input__title'>{name}</span>
		</label>

	);
};

export default SortInput;
