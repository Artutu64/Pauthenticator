package com.pauthenticator

import android.util.Base64
import com.facebook.react.bridge.*
import java.nio.ByteBuffer
import java.util.*
import java.util.concurrent.TimeUnit
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import kotlin.math.pow

class TOTPModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "TOTPModule"

    private fun decodeBase32(secret: String): ByteArray {
        val alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
        val cleanedSecret = secret.replace("=", "").uppercase(Locale.getDefault())
        var buffer = 0
        var bitsLeft = 0
        val bytes = mutableListOf<Byte>()

        for (char in cleanedSecret) {
            val value = alphabet.indexOf(char)
            if (value == -1) continue

            buffer = (buffer shl 5) or value
            bitsLeft += 5

            if (bitsLeft >= 8) {
                bytes.add((buffer shr (bitsLeft - 8) and 0xFF).toByte())
                bitsLeft -= 8
            }
        }
        return bytes.toByteArray()
    }

    private fun generateTOTP(secret: String, digits: Int, period: Int): String {
        val currentTime = TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis())
        val timeCounter = currentTime / period

        val key = decodeBase32(secret)
        val counter = ByteBuffer.allocate(8).putLong(timeCounter).array()

        val mac = Mac.getInstance("HmacSHA1")
        mac.init(SecretKeySpec(key, "HmacSHA1"))
        val hmac = mac.doFinal(counter)

        val offset = hmac[hmac.size - 1].toInt() and 0x0F
        val binary =
            ((hmac[offset].toInt() and 0x7F) shl 24) or
            ((hmac[offset + 1].toInt() and 0xFF) shl 16) or
            ((hmac[offset + 2].toInt() and 0xFF) shl 8) or
            (hmac[offset + 3].toInt() and 0xFF)

        val otp = binary % (10.0.pow(digits).toInt())
        return otp.toString().padStart(digits, '0')
    }

    @ReactMethod
    fun getTOTP(secret: String, digits: Int, period: Int, promise: Promise) {
        try {
            val otp = generateTOTP(secret, digits, period)
            promise.resolve(otp)
        } catch (e: Exception) {
            promise.reject("ERROR", "Erreur lors du calcul du TOTP: ${e.message}")
        }
    }
}