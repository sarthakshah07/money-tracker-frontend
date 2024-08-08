import { EncryptStorage } from 'encrypt-storage'

const REACT_APP_ENCRYPTSTORAGE_SECRET_KEY = "securesecure"

export const encryptStorage = new EncryptStorage(REACT_APP_ENCRYPTSTORAGE_SECRET_KEY, {
  prefix: '@secure',
});