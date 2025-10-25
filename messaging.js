// ===== Diffie-Hellman In Simple Messaging App =====

// simple modular exponentiation with BigInt
function modExp(base, exponent, modulus) {
    let result = 1n
    base = base % modulus
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus
        }
        exponent = exponent / 2n
        base = (base * base) % modulus
    }
    return result
}

// public parameters (tiny for demo, real DH uses 2048+ bit primes!)
const p = 23n
const g = 5n

// ruth's private and public keys
const ruthSec = 6n
const ruthPub = modExp(g, ruthSec, p)

// mark's private and public keys
const markSec = 15n
const markPub = modExp(g, markSec, p)

// shared secret calculation
const sharedRuth = modExp(markPub, ruthSec, p)
const sharedMark = modExp(ruthPub, markSec, p)

console.log("Shared Secret (Ruth):", sharedRuth.toString())
console.log("Shared Secret (Mark):  ", sharedMark.toString())

// ===== simple encryption using shared secret with xOR =====
function encrypt(message, key) {
    return message
        .split("")
        .map(ch => String.fromCharCode(ch.charCodeAt(0) ^ Number(key)))
        .join("")
}

function decrypt(ciphertext, key) {
    return encrypt(ciphertext, key) // xOR again to decrypt
}

// messaging demo
const message = "Hello Mark!"
const ciphertext = encrypt(message, sharedRuth)
const decrypted = decrypt(ciphertext, sharedMark)

console.log("--- Messaging Demo ---")
console.log("Ruth sends:", message)
console.log("Encrypted over insecure channel:", ciphertext)
console.log("Mark decrypts:", decrypted)
