import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.find();
  }
}
