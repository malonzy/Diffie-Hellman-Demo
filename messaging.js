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

// deborah's private and public keys
const debSec = 6n
const debPub = modExp(g, debSec, p)

// gideon's private and public keys
const gidSec = 15n
const gidPub = modExp(g, gidSec, p)

// shared secret calculation
const sharedDeborah = modExp(gidPub, debSec, p)
const sharedGideon = modExp(debPub, gidSec, p)

console.log("Shared Secret (Deborah):", sharedDeborah.toString())
console.log("Shared Secret (Gideon):  ", sharedGideon.toString())

// ===== Simple "Encryption" using shared secret with xOR =====
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
const message = "Hello Gideon!"
const ciphertext = encrypt(message, sharedDeborah)
const decrypted = decrypt(ciphertext, sharedGideon)

console.log("--- Messaging Demo ---")
console.log("Deborah sends:", message)
console.log("Encrypted over insecure channel:", ciphertext)
console.log("Gideon decrypts:", decrypted)
