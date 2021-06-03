import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home() {
    return '<h1>this is a nestjs demo project</h1>';
  }
}
