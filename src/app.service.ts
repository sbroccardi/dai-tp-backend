import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getPing(): string {
    this.logger.log('PING!');
    return 'PING!';
  }

  getLive(): string {
    this.logger.log('LIVE');
    return 'LIVE';
  }

  getReady(): string {
    this.logger.log('READY');
    return 'READY';
  }

  getHealth(): string {
    return JSON.parse(
      '{"Downstream Operation Status": "OK", "Database connection": "OK"}',
    );
  }
}
