import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EncryptionPayload } from './encrypt.types';
import {
  Cipher,
  createCipheriv,
  createDecipheriv,
  Decipher,
  randomBytes,
  scrypt,
} from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptService {
  private readonly SECRET: string;

  constructor(private readonly configService: ConfigService) {
    this.SECRET = this.configService.get('encrypt.secret');
  }

  async encrypt(value: string): Promise<EncryptionPayload> {
    const { iv, cipher } = await this.initCipher();

    return {
      iv,
      encryptedData: Buffer.concat([
        cipher.update(value),
        cipher.final(),
      ]).toString('base64'),
    };
  }

  async decrypt(value: string, iv: string): Promise<string> {
    const decipher = await this.initDecipher(iv);

    const valueBuffer = Buffer.from(value, 'base64');
    return Buffer.concat([
      decipher.update(valueBuffer),
      decipher.final(),
    ]).toString();
  }

  private async initCipher(): Promise<{ cipher: Cipher; iv: string }> {
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(this.SECRET, 'salt', 32)) as Buffer;

    const cipher = createCipheriv('aes-256-ctr', key, iv);

    return { cipher, iv: iv.toString('hex') };
  }

  private async initDecipher(iv: string): Promise<Decipher> {
    const key = (await promisify(scrypt)(this.SECRET, 'salt', 32)) as Buffer;

    return createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
  }
}
