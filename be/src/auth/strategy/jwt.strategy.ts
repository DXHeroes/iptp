import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { configService } from '../../config/config.service';
import { ConfigKeys } from '../../config/configKeys.enum';
import { User } from '../entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(
        ConfigKeys.JWT_SECRET,
        'ultra-hard-to-guess',
      ),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(
    jwt: { userId: string },
    done: (err: any, result: User | boolean) => void,
  ): Promise<void> {
    try {
      const user = await this.authService.getUserById(jwt.userId);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
