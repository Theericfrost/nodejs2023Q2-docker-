import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UpdatePasswordDto } from './dto/user.dto';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  fieldsFilter = {
    id: true,
    login: true,
    password: false,
    version: true,
    createdAt: true,
    updatedAt: true,
  };

  getUserWithoutPassword(user) {
    const newUser = structuredClone(user);
    delete newUser.password;
    return newUser;
  }

  async getUsers() {
    return await this.dbService.user.findMany({ select: this.fieldsFilter });
  }

  async getUser(id: string) {
    const user = await this.dbService.user.findFirst({
      where: { id },
      select: this.fieldsFilter,
    });

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

  async createUser(body) {
    const newUser = {
      ...body,
      id: uuidv4(),
      version: 1,
    };

    const responce = await this.dbService.user.create({
      data: { ...newUser },
      select: this.fieldsFilter,
    });

    return {
      ...responce,
      createdAt: Number(responce.createdAt),
      updatedAt: Number(responce.updatedAt),
    };
  }

  async updatePassword(id: string, body: UpdatePasswordDto) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.dbService.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException("User dosn't exists", HttpStatus.NOT_FOUND);
    }

    if (user?.password !== body.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    const responce = await this.dbService.user.update({
      where: { id },
      data: {
        ...user,
        password: body.newPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
      select: this.fieldsFilter,
    });

    return {
      ...responce,
      createdAt: Number(responce.createdAt),
      updatedAt: Number(responce.updatedAt),
    };
  }

  async deleteUser(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Not valid id. Need uuid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.dbService.user.findFirst({ where: { id } });

    if (!user) {
      throw new HttpException("User dosn't exists", HttpStatus.NOT_FOUND);
    }

    await this.dbService.user.delete({ where: { id } });

    return;
  }
}
