import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserDto, UpdatePasswordDto, CreateUserDto } from './dto/user.dto';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  getUserWithoutPassword(user) {
    const newUser = structuredClone(user);
    delete newUser.password;
    return newUser;
  }

  getUsers() {
    return this.dbService
      .getDataBase()
      .users.map((user) => this.getUserWithoutPassword(user));
  }

  getUser(id: string) {
    const user = this.dbService
      .getDataBase()
      .users.find((user: UserDto) => user.id === id);

    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!user) {
      throw new HttpException("User dosn't exists", HttpStatus.NOT_FOUND);
    }

    return this.getUserWithoutPassword(user);
  }

  createUser(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: uuidv4(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.dbService.getDataBase().users.push(newUser);
    return this.getUserWithoutPassword(newUser);
  }

  updatePassword(id: string, body: UpdatePasswordDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.dbService
      .getDataBase()
      .users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException("User dosn't exists", HttpStatus.NOT_FOUND);
    }

    if (user?.password !== body.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    user.password = body.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();

    return this.getUserWithoutPassword(user);
  }

  deleteUser(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.dbService
      .getDataBase()
      .users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException("User dosn't exists", HttpStatus.NOT_FOUND);
    }

    this.dbService.getDataBase().users = this.dbService
      .getDataBase()
      .users.filter((user) => user.id !== id);
    return;
  }
}
