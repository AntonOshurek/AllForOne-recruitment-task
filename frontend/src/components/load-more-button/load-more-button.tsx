import { MouseEventHandler, useState } from 'react';
//store
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setPaginationCount } from '../../store/slices/app-slice';
import { SelectorGetPageCount, SelectorGetServerDataLength } from '../../store/selectors/app-selectors';
//vars
import { itemsOnOnePage } from '../../variables/variables';
//styles
import './load-more-button.scss';

const LoadMoreButton = (): JSX.Element => {
	const [hideButton, setHideButton] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const currentPageCount = useAppSelector(SelectorGetPageCount);
	const serverDataLength = useAppSelector(SelectorGetServerDataLength);

	const maxCount = Math.ceil(serverDataLength / itemsOnOnePage);

	const onLoadMoreBtnHandler: MouseEventHandler<HTMLButtonElement> = (evt): void => {
		const newCount = currentPageCount + 1;
		if(newCount === maxCount) {
			dispatch(setPaginationCount({newPaginationCount: newCount}));
			setHideButton(true)
		} else if (newCount > maxCount) {
			setHideButton(true)
		} else {
			dispatch(setPaginationCount({newPaginationCount: newCount}));
			setHideButton(false)
		}
	};

	return (
		<button className='load-more-button'
			type='button'
			onClick={onLoadMoreBtnHandler}
			disabled={hideButton}>
			LOAD MORE
		</button>
	);
};

export default LoadMoreButton;
