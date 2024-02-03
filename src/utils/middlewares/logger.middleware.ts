import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {

		console.log('Request ... ', req.headers);
		console.log('Request Orgin... ', req.headers.origin);
		// console.log('Request ... ', JSON.stringify(req.headers));
		next();
	}
}