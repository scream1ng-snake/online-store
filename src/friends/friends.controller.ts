import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { request, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/auth/user.decorator';
import { FollowDto } from './dto/follow.dto';
import { FriendsService } from './friends.service';

@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(
    private friendsService: FriendsService,
    private authService: AuthService
  ) {}

  @Get()
  getAllFriends() { return console.log("all friends") }

  @Get("/:id")
  getFriends(
    @Param("id") id: number,
    @Query("type") type: string,
    @Query("page") page: number, 
    @Query("limit") limit: number,
    @Req() request: Request, 
    @Res({ passthrough: true }) response: Response,
    @User() user
  ) {
    if (!request.cookies) {throw new HttpException("Невозможно выплднить запрос, вы не авторизованы", HttpStatus.BAD_REQUEST)}
    switch(type) {
      case "mutual": return this.friendsService.getMutual(user.id); // return console.log("MUTUTAL")
      case "incoming": return this.friendsService.getIncoming(user.id); // return console.log("INCOMING")
      case "outgoing": return this.friendsService.getOutGoing(user.id);  // return console.log("OUTGOING")
    }
    
    return this.friendsService.getAll()
  }

  @Put("/:id")
  follow(
    @Param("id") id: number,
    @User() user
  ) {
    let dto: FollowDto = {
      sender: user.id, 
      recipient: id
    }
    return this.friendsService.follow(dto);
  }

  @Delete("/:id")
  unFollow(
    @Param("id") id: number,
    @User() user
  ) {
    let dto: FollowDto = {
      sender: user.id, 
      recipient: id
    }
    return this.friendsService.unfollow(dto);
  }

}
