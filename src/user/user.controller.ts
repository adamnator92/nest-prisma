import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() query) {
    return this.userService.findMany(query);
  }

  @Post()
  async createUser(@Body() userData: { name?: string; email: string }) {
    // return this.userService.createUser(userData);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne({ id: Number(id) });
  }

  @Put()
  async signupUser(@Body() userData: { name?: string; email: string }) {
    // return this.userService.createUser(userData);
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
