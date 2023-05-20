import { Controller, Get, Header } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('misc')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({ summary: 'Health status' })
  @ApiResponse({ status: 503, description: 'Service unavailable.' })
  @Header('Cache-Control', 'no-store')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('/')
  @ApiOperation({ summary: 'Ping' })
  @Header('Cache-Control', 'no-store')
  getPing(): string {
    return this.appService.getPing();
  }
}
