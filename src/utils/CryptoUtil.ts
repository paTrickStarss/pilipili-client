/*
 * Copyright (c) 2025. Bubble
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

  private constructor() {}

  public static get instance(): CryptoUtil {
    if (!CryptoUtil._instance) {
      CryptoUtil._instance = new CryptoUtil()
    }
    return CryptoUtil._instance
  }

  private PUBLIC_KEY: string = '-----BEGIN PUBLIC KEY-----' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlmR/sv0t9aSdYYmKQUveJ2JV+vsaDVQ584/E8PGJxZcrD94UcPK1OcDQX+s8fwPWMsWR6GbR7+GqP5wLTWf8AFCvaInsVDV2vFfUKkHyImKbq4EsSJa7Yem/B0/5dXYbYoDfsgzSFp159wguiW88bXxOFeO5J4rmRHUfcV5lurRya80z8wdPlSjm3KmGgvS8nJB0GHav2QRe6BcbzW3WQ26zSLsa3qnvIb3Q75Coaw2FOWgoUXrOLrKssDuR3dvOPNCjW8p8lGpwRG3+CYxS3R5tsQ6o64S44PdP3iEC+yr0Rwvcc6cWY0HZRGLdvv8BC3p9Nza2PLT7yvprXixGLQIDAQAB' +
    '-----END PUBLIC KEY-----'
  private PRIVATE_KEY: string = '-----BEGIN PRIVATE KEY-----' +
    'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCWZH+y/S31pJ1hiYpBS94nYlX6+xoNVDnzj8Tw8YnFlysP3hRw8rU5wNBf6zx/A9YyxZHoZtHv4ao/nAtNZ/wAUK9oiexUNXa8V9QqQfIiYpurgSxIlrth6b8HT/l1dhtigN+yDNIWnXn3CC6JbzxtfE4V47kniuZEdR9xXmW6tHJrzTPzB0+VKObcqYaC9LyckHQYdq/ZBF7oFxvNbdZDbrNIuxreqe8hvdDvkKhrDYU5aChRes4usqywO5Hd28480KNbynyUanBEbf4JjFLdHm2xDqjrhLjg90/eIQL7KvRHC9xzpxZjQdlEYt2+/wELen03NrY8tPvK+mteLEYtAgMBAAECggEAD+qi+TaCXrUFUwVTdIWrBVAK+X0JzM9VMsnMdhOaGSdej1dZonqNY4dchkpHJMorKURvpMD9Bv5DHmhNaevPZ9kiN1YhhOgDoPtKoQ5Jqgn1n7kUDrqlKj+q0ANOy3esfkhVZGqm8W3JMrPS+QikxJGbUgW/2seAh049/amX6qJ0LgTAjIsPq+gKeBOtVaO5Rzdym9ydaWHrhrbB0FCmT0RbcqhdidUWyRldcjbPmm8Uy3S2wrO8fP5f9h3hlRG8W4YpcLeG3IYo/A37ULFeuWIIkEsO0qB4VzXp12jveyI05xHj2xyHYckCj0kZ+1An7JqlNjtuhFIpQiMFeloSAQKBgQDpvOCnyLZMJ1OwSOzBnLdMlNlVXtKJCeVSUFK1ZVgoafTDi4aduL1rquLAijrRELF+HT5x0s2pIgSUBT8XFGljFI0g1DcvZ8C2RsvfH5qvQMIFxBNjZ4FPYSf44On9wKiZSFeryheL/evfwepXf7vRXENKCEMr3PjY8oxReEc5HQKBgQCkt3PVo9W61JkJsQmimW4ygVcW7QwKPd9ifkojag+Hd6SmjFg1nIafSWDgInJqWhzeRNrLL3OYxNLShdyZ+gtQ+rLwaWwLxSH+aXIDzD5uXEJZqrUHmB4sGDv18ZjLy7hjgrwN7lg7nuYzqsmtWvBkESaZBP/EQZecojzOHD3EUQKBgQC/xVHlF05KSPHm7s4hQ/03/eAapQPDn7Tgxjo1zgJ4lgZV8cHu4cW38qq8Ii2DnliiCkhThwtpuxlagLt0qjCVNCVeS/9DC7MXWhqm4/070LvfkzH9Gs0DXck37wDMSyeJK8uSjOqo1xqRqT4lsA1fBn3G3eSOtmwNQ2NQ7IgzGQKBgQCgkxsATVxhaznZ4dXDxpFP+Rj+h45yOYkYyobZ6V5EMNW5ax3e/b2bcPxY5BvoI/r6j+M/qv2lE1N22fqJvOHlStDAX/Vtr/sIuqDkpOrDyXsBUNJ0Gc5oLCPgCmtrWSljESLk7dLkJG7ENZ2wOvQYiUO4btAr8cmsb9iZEZ0BUQKBgBBV3oGXrSpr9UU74BrlAqwiUlaqwPwEei7c+Vta/NvaMkDXHix57J1ioafaYM2rlqAd7/CjW98o+n+p8bLN2r4sWusX/+DriFT/PDTq9m54/wa/KYGo+Q7jVVRLFbQzGM4z7npDQz09A9qyzJiI289+n7+RyxWxOgG9GBGPqD2Q' +
    '-----END PRIVATE KEY-----'
  private CRYPTO_ALGORITHM: "RSA" = 'RSA'
  private SIGNATURE_ALGORITHM: string = 'SHA256withRSA'
  private PRIVATE_KEY_FORMAT: PrivateKeyOutputFormatType = 'PKCS8PRV'
  private KEY_LENGTH: number = 2048

  /**
   * RSA加密
   * @param plaintext
   */
  public encrypt(plaintext: string): string {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(this.PUBLIC_KEY)
    return encryptor.encrypt(plaintext) || ''
  }

  /**
   * RSA解密
   * @param cipherText
   */
  public decrypt(cipherText: string): string {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(this.PRIVATE_KEY)
    return decryptor.decrypt(cipherText) || ''
  }


  /**
   * 生成RSA密钥对，填充模式PKCS8
   */
  public generateRSAKeypair() {
    const keypair = JSRSASign.KEYUTIL.generateKeypair(this.CRYPTO_ALGORITHM, this.KEY_LENGTH)
    const privateKey = JSRSASign.KEYUTIL.getPEM(keypair.prvKeyObj, this.PRIVATE_KEY_FORMAT)
    const publicKey = JSRSASign.KEYUTIL.getPEM(keypair.pubKeyObj)
    return { privateKey, publicKey }
  }

  /**
   * SHA256withRSA加签
   * @param text
   */
  public sign(text: string): string {
    const key = JSRSASign.KEYUTIL.getKey(this.PRIVATE_KEY)
    const signature = new JSRSASign.KJUR.crypto.Signature({ alg: this.SIGNATURE_ALGORITHM })
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
    const signature = new JSRSASign.KJUR.crypto.Signature({ alg: this.SIGNATURE_ALGORITHM })
    signature.init(key)
    signature.updateString(text)
    return signature.verify(JSRSASign.b64tohex(base64SignStr))
  }
}
