import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseInterceptors } from '@nestjs/common';
import { UserInterceptor } from 'src/interceptors/user-intercept';

@UseInterceptors(UserInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  findMe(@Req() req) {
    return req.user;
  }

  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(req.user, updateUserDto);
  }

  @Get('me/wishes')
  async findMeWishes(@Req() req) {
    const { id } = req.user;

    return this.wishesService.findUsersWishes(id);
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Get(':username/wishes')
  async findUsersWishes(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new Error('User not found');
    }

    return this.wishesService.findUsersWishes(user.id);
  }

  @Post('find')
  async findMany(@Body('query') query: string) {
    return await this.usersService.findMany(query);
  }
}
