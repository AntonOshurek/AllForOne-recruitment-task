import { ChangeEvent } from "react";
//vars
import { reportUnitValue } from "../../../../../variables/variables";

interface IUnitInputPropsType {
	unitValue: reportUnitValue,
	isChecked: boolean,
	onChangeHandler: (evt: ChangeEvent<HTMLInputElement>) => void,
};

const UnitInput = ({unitValue, isChecked, onChangeHandler}: IUnitInputPropsType): JSX.Element => {
	return (
		<label className='card-edit__unit-label'>
			<input className='card-edit__unit-input visually-hidden'
				type="radio"
				name='unit'
				value={unitValue}
				checked={isChecked}
				onChange={onChangeHandler}/>

			<span className='card-edit__unit-label-text'>
				{unitValue}
			</span>
		</label>
	);
};

export default UnitInput;
