//components
import {AddReportButton} from '../';
//styles
import './header.scss';

const Header = (): JSX.Element => {
	return (
		<header className='header'>
			<h1 className="header__title">REPORTSMANAGER</h1>

			<AddReportButton/>
		</header>
	);
};

export default Header;
