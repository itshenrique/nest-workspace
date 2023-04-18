import { Body, Controller, Post, Request } from '@nestjs/common';
import { PostService } from '@app/models/mariadb/services';
import { CreatePostDto } from './post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators';
import { RoleEnum } from '../../auth/enums';
import { RequestWithSession } from '../../auth/auth.dto';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Roles(RoleEnum.User)
  @ApiBearerAuth()
  createPost(
    @Request() request: RequestWithSession,
    @Body() post: CreatePostDto,
  ) {
    return this.postService.createPost(request.session.passport.user.id, post);
  }
}
