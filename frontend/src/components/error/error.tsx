//styles
import './error.scss';

interface IErrorPropsType {
	errText: string,
};

const Error = ({errText}: IErrorPropsType): JSX.Element => {
	return (
		<div className="error">
			<p>{errText}</p>
		</div>
	);
};

export default Error;
