// simple Diffie-Hellman demonstration in JavaScript

// modular exponentiation function to generate the public keys
function modExp(base, exponent, modulus) {
    return base ** exponent % modulus
}

// publicly agreed prime (p) and generator (g)
const p = 23n // small prime for demo
const g = 5n  // generator

// deborah picks a private key
const debSec = 6n
const debPub = modExp(g, debSec, p) // deborah's public value

// gideon picks a private key
const gidSec = 15n
const gidPub = modExp(g, gidSec, p) // gideon's public value

// exchange and compute shared secret
const sharedSecretDeborah = modExp(gidPub, debSec, p)
const sharedSecretGideon = modExp(debPub, gidSec, p)

console.log("Public prime number (p):", p.toString())
console.log("Generator (g):", g.toString())
console.log("Deborah private:", debSec.toString(), "Deborah public:", debPub.toString())
console.log("Gideon private:", gidSec.toString(), "Gideon public:", gidPub.toString())
console.log("Deborah's shared secret:", sharedSecretDeborah.toString())
console.log("Gideon's shared secret:", sharedSecretGideon.toString())
