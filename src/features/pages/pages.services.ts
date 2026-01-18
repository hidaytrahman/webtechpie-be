import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
import { Page } from './schema/portfolio.schema';
import { UpdatePageDto } from './dto/update-page.dto';
import landingMock from './_mock_/landing.page.json';
import solutionsMock from './_mock_/solutions.page.json';
import communityMock from './_mock_/community.page.json';
import portfolioMock from './_mock_/portfolio.page-back.json';

@Injectable()
export class PagesServices {
	constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

	async fetchByName(name: string): Promise<any> {
		console.log('name ', name);
		const result = await this.pageModel.findOne({ name });
		console.log('results hidy ', result);
		if (result) {
			return result;
		}

		const defaults: Record<string, any> = {
			landing: landingMock,
			solutions: solutionsMock,
			community: communityMock,
			portfolio: portfolioMock,
		};

		const fallback = defaults[name];

		if (fallback) {
			const created = new this.pageModel(fallback);
			const saved = await created.save();
			return saved;
		}

		return {
			message: `okay No result found for '${name}'`,
		};
	}

	async createPage(payload: CreatePageDto): Promise<any> {
		// check if page is already exists
		const page = await this.pageModel.findOne({
			name: payload.name,
		});

		if (page) {
			return {
				message: `Page '${payload.name}' is already exists!`,
			};
		} else {
			const data = new this.pageModel(payload);
			const result = await data.save();
			return {
				data: result,
				message: `Page '${result.name}' has been successfully created!`,
			};
		}
	}

	async findAll(): Promise<Page[]> {
		return this.pageModel.find().exec();
	}

	async findOneById(id: string): Promise<Page> {
		const page = await this.pageModel.findById(id).exec();
		if (!page) {
			throw new NotFoundException(`Page with id '${id}' not found`);
		}
		return page;
	}

	async updatePage(id: string, payload: UpdatePageDto): Promise<any> {
		const page = await this.pageModel
			.findByIdAndUpdate(id, payload, { new: true })
			.exec();

		if (!page) {
			throw new NotFoundException(`Page with id '${id}' not found`);
		}

		return {
			data: page,
			message: `Page '${page.name}' has been updated successfully`,
		};
	}

	async deletePage(id: string): Promise<any> {
		const page = await this.pageModel.findByIdAndDelete(id).exec();

		if (!page) {
			throw new NotFoundException(`Page with id '${id}' not found`);
		}

		return {
			message: `Page '${page.name}' has been deleted successfully`,
		};
	}
}
