import { Route, Routes, BrowserRouter} from "react-router-dom";
//pages
import * as Pages from "../pages";
//components
import { ReportsOverview } from "../components";
//variables
import { AppRoute, rootBaseName } from "../variables/routes-variables";

function App() {
  return (
		<BrowserRouter basename={rootBaseName}>
			<Routes>
				<Route path={AppRoute.ROOT} element={<Pages.IndexPage />} >
					<Route index element={<ReportsOverview />} />
				</Route>
			</Routes>
		</BrowserRouter>
  );
}

export default App;
