import { TIME } from '@app/shared/common/constants';
import { get } from 'lodash';

export const redisSessionConfig = {
  password: get(process.env, 'REDIS_PASSWORD', ''),
  host: get(process.env, 'REDIS_HOST', ''),
  port: parseInt(get(process.env, 'REDIS_PORT', '')),
  secret: get(process.env, 'REDIS_SESSION_SECRET', ''),
  ttl:
    parseInt(get(process.env, 'REDIS_SESSION_TTL_IN_DAYS', '1')) *
    TIME.DAY_IN_HOURS *
    TIME.HOUR_IN_SECONDS,
  provide: 'SESSION:REDIS',
};
