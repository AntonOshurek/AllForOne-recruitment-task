//styles
import './error.scss';

interface IErrorPropsType {
	text: string,
	err?: string;
};

const Error = ({text, err}: IErrorPropsType): JSX.Element => {
	return (
		<div className="error">
			<h3 className='error__title'>{text}</h3>

			{
				err && <p className='error__info'>{err}</p>
			}
		</div>
	);
};

export default Error;
