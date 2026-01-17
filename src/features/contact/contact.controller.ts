import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.schema';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Post()
	@UseGuards(JwtAuthGuard, AdminGuard)
	@ApiOperation({ summary: 'Create a new contact' })
	@ApiBody({ type: CreateContactDto })
	@ApiCreatedResponse({
		description: 'The contact has been successfully created.',
		type: Contact,
	})
	@ApiBadRequestResponse({ description: 'Bad Request.' })
	async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
		return this.contactService.create(createContactDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all contacts' })
	@ApiOkResponse({ description: 'Return all contacts.', type: [Contact] })
	async findAll(): Promise<Contact[]> {
		return this.contactService.findAll();
	}
}
