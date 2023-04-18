import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  hashData(data: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(data, saltRounds);
  }

  async compareData(password, hashedPassword): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
