import { get } from 'lodash';

export const mariadbConfig = {
  url: get(process.env, 'MYSQL_URL', ''),
  host: get(process.env, 'MYSQL_HOST', ''),
  port: parseInt(get(process.env, 'MYSQL_PORT', '')),
  database: get(process.env, 'MYSQL_DATABASE', ''),
  username: get(process.env, 'MYSQL_USER', ''),
  password: get(process.env, 'MYSQL_PASSWORD', ''),
};
