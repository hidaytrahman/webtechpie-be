import * as dotenv from 'dotenv';
import { connect, connection, model } from 'mongoose';
import { Page, PageSchema } from '../features/pages/schema/portfolio.schema';
import landing from '../features/pages/_mock_/landing.page.json';
import solutions from '../features/pages/_mock_/solutions.page.json';
import community from '../features/pages/_mock_/community.page.json';
import portfolio from '../features/pages/_mock_/portfolio.page-back.json';

dotenv.config();

async function seedPages() {
	const uri =
		process.env.MONGODB_URI || 'mongodb://localhost:27017/webtechpie';

	await connect(uri);

	const PageModel = model(Page.name, PageSchema);

	const pages = [landing, solutions, portfolio, community] as any[];

	for (const page of pages) {
		if (!page || !page.name) {
			continue;
		}

		await PageModel.findOneAndUpdate({ name: page.name }, page, {
			upsert: true,
			new: true,
		});
	}

	await connection.close();
}

seedPages()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
