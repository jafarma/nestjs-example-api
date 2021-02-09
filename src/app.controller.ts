import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'Welcome' })
  @Get()
  root(): string {
    return `<h3>Welcome to Test API</h3>
            <br/>Checkout the <a href="docs">API Docs</a>
            <br/><br/><hr><code>Version: ${this.appService.getVersion()}</code>`;
  }
}
