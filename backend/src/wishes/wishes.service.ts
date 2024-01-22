/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from '../users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: User, createWishDto: CreateWishDto) {
    const wish = this.wishRepository.save({
      ...createWishDto,
      owner: user,
    });
    delete user.password;
    return wish;
  }

  findUsersWishes(id: number) {
    return this.wishRepository.find({
      where: {
        owner: {
          id,
        },
      },
    });
  }

  findLastWishes() {
    return this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  findTopWishes() {
    return this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  findOne(id: number) {
    return this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async update(id: number, userId: number, updateWishDto: UpdateWishDto) {
    const candidate = await this.findOne(id);

    if (!candidate) {
      throw new Error('User not found');
    }

    if (candidate.offers.length > 0) {
      throw new BadRequestException('This gift was already put forward');
    }

    if (candidate.owner.id !== userId) {
      throw new Error('User did not put forward such present');
    }

    return this.wishRepository.save({
      id,
      ...updateWishDto,
    });
  }

  async remove(id: number, userId: number) {
    const candidate = await this.findOne(id);

    if (!candidate) {
      throw new Error('User not found');
    }

    if (candidate.owner.id !== userId) {
      throw new Error('User did not put forward such present');
    }

    await this.wishRepository.delete({ id });

    return {};
  }

  async copyWish(wishId: number, userId: number) {
    const originalWish = await this.wishRepository.findOneBy({ id: wishId });

    if (!originalWish) {
      throw new Error('Gift already exists');
    }
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const wishData: CreateWishDto = {
      name: originalWish.name,
      description: originalWish.description,
      link: originalWish.link,
      image: originalWish.image,
      price: originalWish.price,
    };

    originalWish.copied += 1;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(Wish, {
        ...wishData,
        owner: user,
      });
      delete user.password;
      await queryRunner.manager.save(originalWish);
      await queryRunner.commitTransaction();
      return {};
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
