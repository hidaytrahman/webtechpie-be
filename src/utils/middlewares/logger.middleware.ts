import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log("Request Orgin... ", req.headers.origin);
		console.log("Incoming request:", req.method, req.url);

		// experiments to block the postman request
		/* if (req.headers.origin === undefined) {
			return res.json("You are not  allowed to access this resource.");
		} else {
			next();
		} */

		next();
	}
}
