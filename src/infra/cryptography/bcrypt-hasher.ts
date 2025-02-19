import { hash, compare } from 'bcryptjs'

import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HasheGenerator } from '@/domain/forum/application/cryptography/hasher-generator'

export class BcrypterHasher implements HasheGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8
  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
