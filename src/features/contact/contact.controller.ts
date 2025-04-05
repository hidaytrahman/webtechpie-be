import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: 201, description: 'The contact has been successfully created.', type: Contact })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({ status: 200, description: 'Return all contacts.', type: [Contact] })
  async findAll(): Promise<Contact[]> {
    return this.contactService.findAll();
  }
}