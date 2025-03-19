/*
 * Copyright (c) 2025.  Bubble
 */

import { JSEncrypt } from 'jsencrypt'
import type { PrivateKeyOutputFormatType } from 'jsrsasign'
import JSRSASign from 'jsrsasign'

/**
 * 加密工具类
 * @author Bubble
 */
export class CryptoUtil {
  private static _instance: CryptoUtil
  private static _initialized: Promise<void>

  private constructor() {}

  public static get instance(): CryptoUtil {
    if (!CryptoUtil._instance) {
      CryptoUtil._instance = new CryptoUtil()
      CryptoUtil._initialized = CryptoUtil._instance.init()
    }
    return CryptoUtil._instance
  }

  public static async checkInitialized(): Promise<void> {
    if (CryptoUtil._initialized) {
      await CryptoUtil._initialized
    }
  }

  private async init() {
    try {
      const publicKeyResp = await fetch('/src/crypto_dependency/crypto_public_key.txt')
      this.PUBLIC_KEY = await publicKeyResp.text()
      console.log('publicKey', this.PUBLIC_KEY, publicKeyResp)
    } catch (error) {
      console.error('CryptoUtil initialization failed', error)
      throw error
    }
  }

  private PUBLIC_KEY: string = ''
  private PRIVATE_KEY: string = ''
  private CRYPTO_ALGORITHM: 'RSA' = 'RSA'
  private SIGNATURE_ALGORITHM: string = 'SHA256withRSA'
  private PRIVATE_KEY_FORMAT: PrivateKeyOutputFormatType = 'PKCS8PRV'
  private KEY_LENGTH: number = 2048

  /**
   * RSA加密
   * @param plaintext
   */
  public encrypt(plaintext: string): string {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(this.PUBLIC_KEY)
    return encryptor.encrypt(plaintext) || ''
  }

  /**
   * RSA解密
   * @param cipherText
   */
  public decrypt(cipherText: string): string {
    const decryptor = new JSEncrypt()
    decryptor.setPrivateKey(this.PRIVATE_KEY)
    return decryptor.decrypt(cipherText) || ''
  }

  /**
   * 生成RSA密钥对，填充模式PKCS8
   */
  public generateRSAKeypair() {
    const keypair = JSRSASign.KEYUTIL.generateKeypair(
      this.CRYPTO_ALGORITHM,
      this.KEY_LENGTH,
    )
    const privateKey = JSRSASign.KEYUTIL.getPEM(
      keypair.prvKeyObj,
      this.PRIVATE_KEY_FORMAT,
    )
    const publicKey = JSRSASign.KEYUTIL.getPEM(keypair.pubKeyObj)
    return { privateKey, publicKey }
  }

  /**
   * SHA256withRSA加签
   * @param text
   */
  public sign(text: string): string {
    const key = JSRSASign.KEYUTIL.getKey(this.PRIVATE_KEY)
    const signature = new JSRSASign.KJUR.crypto.Signature({
      alg: this.SIGNATURE_ALGORITHM,
    })
    signature.init(key)
    signature.updateString(text)
    return JSRSASign.hextob64(signature.sign())
  }

  /**
   * SHA256withRSA验签
   * @param text
   * @param base64SignStr
   */
  public verify(text: string, base64SignStr: string): boolean {
    const key = JSRSASign.KEYUTIL.getKey(this.PUBLIC_KEY)
    const signature = new JSRSASign.KJUR.crypto.Signature({
      alg: this.SIGNATURE_ALGORITHM,
    })
    signature.init(key)
    signature.updateString(text)
    return signature.verify(JSRSASign.b64tohex(base64SignStr))
  }
}
