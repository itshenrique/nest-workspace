import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  profileId: number;

  @ApiProperty()
  message: string;
}
