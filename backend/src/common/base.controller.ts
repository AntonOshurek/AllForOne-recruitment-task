//dependencies
import { Response, Router } from 'express';
import { injectable } from 'inversify';
//types
import type { ILogger } from '../logger/logger.interface';
import type { ExpressReturnType, IControllerRoute } from './route.interface';
//services
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	};

	get router(): Router {
		return this._router;
	};

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	};

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	};

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	};

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`Bind - [${route.method}] ${route.path}`); //we log the path that we will bind.
			const middleware = route.middlewares?.map((m) => m.execute.bind(m)); // iterate over handlers and bind context to them
			const handler = route.func.bind(this); //bind the hndler function from the passed route to our class.
			const pipline = middleware ? [...middleware, handler] : handler; // combine midleware and handler in one array
			this.router[route.method](route.path, pipline); // create a Router from express based on the method, path and function from the passed route.
		};
	};
};
