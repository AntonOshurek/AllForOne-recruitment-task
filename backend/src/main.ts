import { ContainerModule, Container, interfaces } from "inversify";
//components
import { App } from "./app";
//services
import { LoggerService } from "./logger/logger.service";
import 'reflect-metadata';
//controllers
import { ReportsController } from "./reports/reports.controller";
//services
import { DatabaseService } from "./database/database.service";
import { ReportsService } from "./reports/reports.service";
//types
import type { ILogger } from "./logger/logger.interface";
//vars
import { TYPES } from "./types";
import { IReportsController } from "./reports/reports.controller.interface";

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
};

//composition root - точка сбора всех зависимостей
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
	bind<IReportsController>(TYPES.ReportsController).to(ReportsController).inSingletonScope();
	bind<ReportsService>(TYPES.ReportsService).to(ReportsService).inSingletonScope();
	bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
