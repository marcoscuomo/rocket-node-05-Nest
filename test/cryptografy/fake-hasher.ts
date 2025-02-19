import { HasheComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HasheGenerator } from '@/domain/forum/application/cryptography/hasher-generator'

export class FakeHasher implements HasheGenerator, HasheComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
