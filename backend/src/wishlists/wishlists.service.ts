/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository, In } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { ServerException } from 'src/exceptions/exception-constructor';
import { ErrorCode } from 'src/exceptions/error-constants';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(
    user: User,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const items = await this.wishRepository.find({
      where: { id: In(createWishlistDto.itemsId) },
    });
    const wishlist = new Wishlist();

    wishlist.owner = user;
    wishlist.name = createWishlistDto.name;
    wishlist.image = createWishlistDto.image;
    wishlist.items = items;

    await this.wishlistRepository.save(wishlist);
    return wishlist;
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });
  }

  async findOneById(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new ServerException(ErrorCode.ListNotFound);
    }

    return wishlist;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ): Promise<Wishlist> {
    const wishlist = await this.findOneById(id);

    if (!wishlist) {
      throw new ServerException(ErrorCode.WishNotFound);
    }

    if (wishlist.owner.id !== userId) {
      throw new ServerException(ErrorCode.NoRightsForEdit);
    }

    const items = updateWishlistDto.itemsId?.length
      ? await this.wishRepository.find({
          where: { id: In(updateWishlistDto.itemsId) },
        })
      : [];

    return await this.wishlistRepository.save({
      ...wishlist,
      name: updateWishlistDto.name,
      image: updateWishlistDto.image,
      items: items.length === 0 ? wishlist.items : items,
    });
  }

  async remove(id: number, userId: number): Promise<Wishlist> {
    const wishlist = await this.findOneById(id);

    if (!wishlist) {
      throw new ServerException(ErrorCode.ListNotFound);
    }

    if (wishlist.owner.id !== userId) {
      throw new ServerException(ErrorCode.NoRightsForRemove);
    }

    await this.wishlistRepository.delete(id);

    return wishlist;
  }
}
