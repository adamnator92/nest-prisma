import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import {
  UserWhereUniqueInput,
  UserOrderByInput,
  UserWhereInput,
  UserCreateInput,
  UserUpdateInput,
} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: UserWhereUniqueInput;
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(userWhereUniqueInput: UserWhereUniqueInput) {
    return this.prisma.user.findOne({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: UserWhereUniqueInput;
    data: UserUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
