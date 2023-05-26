import { MouseEventHandler } from 'react';
//styles
import './load-more-button.scss';

const LoadMoreButton = (): JSX.Element => {
	const onLoadMoreBtnHandler: MouseEventHandler<HTMLButtonElement> = (evt): void => {
		console.log(evt.target);
	};

	return (
		<button className='load-more-button' type='button' onClick={onLoadMoreBtnHandler}>
			LOAD MORE
		</button>
	);
};

export default LoadMoreButton;
