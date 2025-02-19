import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { BcrypterHasher } from './bcrypt-hasher'
import { HasheGenerator } from '@/domain/forum/application/cryptography/hasher-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcrypterHasher,
    },
    {
      provide: HasheGenerator,
      useClass: BcrypterHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HasheGenerator],
})
export class CryptographyModule {}
