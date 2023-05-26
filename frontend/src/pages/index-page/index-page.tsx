import { Outlet } from 'react-router-dom';
//components
import { Header, Sort } from '../../components';
//styles
import './index-page.scss';

const IndexPage = (): JSX.Element => {
	return (
		<div className='index-page'>
			<Header/>

			<Sort/>

			<main className='index-page__main'>

				<Outlet />
			</main>
			<footer></footer>
		</div>
	);
};

export default IndexPage;
