import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginRequiredGuard } from '../../common/login.required.guard';
import { User } from '../../entity/user.entity';
import { UserIdentity } from '../../entity/user.identity.entity';
import { PagingBaseDto } from '../../common/paging.base.dto';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Transaction()
  async create(@Body() createUserDto: CreateUserDto, @TransactionManager() manager: EntityManager) {
    const userIdentity = new UserIdentity();
    userIdentity.password = createUserDto.password;
    // 使用了级联不用单独保存了
    // 级联保存和事务没关系，即使看不到分次保存，实际也是分次保存
    // 比如保存 userIdentity 没问题，但是保存 user 出现了唯一性约束异常等等
    // await manager.save(userIdentity);
    // throw new Error('error')

    const user = User.merge(new User(), createUserDto);
    user.userIdentity = userIdentity;
    await manager.save(user);

    return user;
  }

  @Get('/page')
  testPagingSearch(@Query() searchDto: PagingBaseDto) {
    console.log(searchDto);
    return this.userService.findAll();
  }

  @Get()
  @UseGuards(LoginRequiredGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundException('user is not existed');
    return user;
  }

  @Patch(':id')
  @UseGuards(LoginRequiredGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(LoginRequiredGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
