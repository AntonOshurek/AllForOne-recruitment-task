import './loading.scss';

const Loading = (): JSX.Element => {
	return (
		<div className='loading'>
			<p className='loading__text'>LOADING...</p>

			<div className='loader'>
				<div className='loader--dot'></div>
				<div className='loader--dot'></div>
				<div className='loader--dot'></div>
				<div className='loader--dot'></div>
				<div className='loader--dot'></div>
				<div className='loader--dot'></div>
			</div>
		</div>
	);
};

export default Loading
