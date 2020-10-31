import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { getServerBaseUri } from '../utils/uri.utils';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async getLinkedInAuth(): Promise<void> {
    // start linkedin flow
    return;
  }

  @Get('/linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async callbackLinkedIn(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const userId = ((req as unknown) as { user: User }).user.id;
    const { accessToken } = await this.authService.generateToken(userId);
    return this.sendCredentials(res, accessToken);
  }

  private sendCredentials(res: Response, accessToken: string): void {
    res
      .status(302)
      .redirect(`${getServerBaseUri(true)}/auth/#access_token=${accessToken}`);
  }
}
