import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
//data from fakie DB
import { DBData } from '../db-data/db-data';

@injectable()
export class DatabaseService {
	constructor(@inject(TYPES.Logger) private logger: ILogger) {
	};

	async connect(): Promise<void> {
		try {
			// await this.client.$connect();
			if(DBData) {
				this.logger.log('[DatabaseService] Successful database connection');
			}
		} catch (err) {
			if (err instanceof Error) {
				this.logger.error(`[DatabaseService] Error connecting to database ${err.message}`);
			};
		};
	};

	async disconnect(): Promise<void> {
		// await this.client.$disconnect();
	};
};
