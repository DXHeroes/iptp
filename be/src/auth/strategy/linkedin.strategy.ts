import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOption, Profile } from 'passport-linkedin-oauth2';
import { configService } from '../../config/config.service';
import { ConfigKeys } from '../../config/configKeys.enum';
import { getServerBaseUri } from '../../utils/uri.utils';
import { AuthService } from '../auth.service';
import { User } from '../entity/user.entity';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly authService: AuthService) {
    super(<StrategyOption>{
      clientID: configService.get(ConfigKeys.CLIENT_ID_LINKEDIN),
      clientSecret: configService.get(ConfigKeys.CLIENT_SECRET_LINKEDIN),
      callbackURL: `${getServerBaseUri()}/api/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: IProfile,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: (err: any, result: User | boolean) => void,
  ): Promise<void> {
    try {
      const user = await this.authService.getUserOnCallback(
        profile.name.givenName,
        profile.name.familyName,
        profile.emails[0].value,
        profile.photos.length > 1
          ? profile.photos[1].value
          : profile.photos.pop().value,
      );
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}

interface IProfile extends Omit<Profile, 'photos'> {
  photos: { value: string }[];
}
