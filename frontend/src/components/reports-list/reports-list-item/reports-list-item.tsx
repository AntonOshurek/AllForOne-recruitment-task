import { useState } from 'react';
//components
import CardData from './card-data/card-data';
import CardEdit from './card-edit/card-edit';
//vars
import { cardInnersNames } from '../../../variables/variables';
//types
import type { IReportType } from '../../../types/reports-type';
//styles
import './reports-list-item.scss';

interface IReportsListItemProps {
	report: IReportType,
};

const ReportsListItem = ({ report }: IReportsListItemProps): JSX.Element => {
	const [cardInnersName, setCardInnersname] = useState<cardInnersNames>(cardInnersNames.DATA);

	const onEditButtonHandler = () => {
		switch(cardInnersName) {
			case cardInnersNames.DATA:
				setCardInnersname(cardInnersNames.EDIT)
				break;
			case cardInnersNames.EDIT:
				setCardInnersname(cardInnersNames.DATA)
				break;
			default:
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _: never = cardInnersName;
				throw new Error('[ReportsListItem] we dont have this action');
		};
	};

	const onSaveButtonHandler = () => {
		setCardInnersname(cardInnersNames.DATA);
	};

	return (
		<li className={`card ${cardInnersName === cardInnersNames.EDIT && 'card--edit'}`}>
			<div className="card__form">
				<div className="card__inner">

					<div className="card__control">
						<button type="button" className="card__btn" onClick={onEditButtonHandler}>
							{
								cardInnersName === cardInnersNames.DATA ? 'edit' : 'cancel'
							}
						</button>
					</div>

					<div className="card__color-bar">
						<svg className="card__color-bar-wave" aria-hidden='true' focusable='false' width="100%" height="10">
						</svg>
					</div>

					{
						cardInnersName === cardInnersNames.DATA ? <CardData report={report}/> : <CardEdit report={report} saveHndler={onSaveButtonHandler}/>
					}

				</div>
			</div>
		</li>
	);
};

export default ReportsListItem;
