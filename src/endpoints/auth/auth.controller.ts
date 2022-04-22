import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Jwt } from "src/utils/decorators/jwt";
import { JwtAuthenticateGuard } from "src/utils/guards/jwt.authenticate.guard";

@Controller()
@ApiTags('auth')
export class AuthController {
	@Get("/auth")
	@UseGuards(JwtAuthenticateGuard)
	@ApiResponse({
		status: 200,
		description: 'Authorizes the user and returns the encoded address',
	})
	authorize(
		@Jwt('address') address: string
	): string {
		return address;
	}
}
