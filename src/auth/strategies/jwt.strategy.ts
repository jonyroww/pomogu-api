import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { makeError } from '../../common/errors';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { IJwtPayload } from '../interfaces/JwtPayload.interface';
import { UserRepository } from '../../users/repositories/User.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userRepository.findOne({ id: payload.sub, deleted_at:null });
    if (!user) {
      throw makeError('USER_NOT_FOUND');
    }

    return user;
  }
}
