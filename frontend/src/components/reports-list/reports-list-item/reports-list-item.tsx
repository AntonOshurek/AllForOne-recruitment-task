import { useState } from 'react';
//components
import CardData from './card-data/card-data';
import CardEdit from './card-edit/card-edit';
//types
import type { IReportType } from '../../../types/reports-type';
//styles
import './reports-list-item.scss';

interface IReportsListItemProps {
	report: IReportType,
};

const ReportsListItem = ({ report }: IReportsListItemProps): JSX.Element => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const onEditButtonHandler = () => {
		switch(isEditing) {
			case false:
				setIsEditing(true);
				break;
			case true:
				setIsEditing(false);
				break;
			default:
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _: never = isEditing;
				throw new Error('[ReportsListItem] we dont have this action');
		};
	};

	const onSaveButtonHandler = (): void => {
		setIsEditing(false);
	};

	return (
		<li className={`card ${isEditing && 'card--edit'}`}>
			<div className="card__form">
				<div className="card__inner">

					<div className="card__control">
						<button type="button" className="card__btn" onClick={onEditButtonHandler}>
							{
								isEditing ? 'cancel' : 'edit'
							}
						</button>
					</div>

					<div className="card__color-bar">
						<svg className="card__color-bar-wave" aria-hidden='true' focusable='false' width="100%" height="10">
						</svg>
					</div>

					{
						isEditing ? <CardEdit report={report} saveHndler={onSaveButtonHandler}/> : <CardData report={report}/>
					}

				</div>
			</div>
		</li>
	);
};

export default ReportsListItem;
