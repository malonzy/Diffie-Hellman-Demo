// simple Diffie-Hellman demonstration in JavaScript

// modular exponentiation function to generate the public keys
function modExp(generator, personalSecret, modulus) {
    return generator ** personalSecret % modulus
}

// publicly agreed prime (p) and generator (g)
const p = 23n // small prime for demo
const g = 5n  // generator

// ruth picks a private key
const ruthSec = 6n
const ruthPub = modExp(g, ruthSec, p) // ruth's public value

// mark picks a private key
const markSec = 15n
const markPub = modExp(g, markSec, p) // mark's public value

// exchange and compute shared secret
const sharedSecretRuth = modExp(markPub, ruthSec, p)
const sharedSecretMark = modExp(ruthPub, markSec, p)

console.log("Public prime number (p):", p.toString())
console.log("Generator (g):", g.toString())
console.log("Ruth's private:", ruthSec.toString(), "Ruth's public:", ruthPub.toString())
console.log("Mark's private:", markSec.toString(), "Mark's public:", markPub.toString())
console.log("Ruth's shared secret:", sharedSecretRuth.toString())
console.log("Mark's shared secret:", sharedSecretMark.toString())

//how are you --> 8928728asdaca../2/30&6ajslkdja42472039482-90348209348298-   ---> how are you
//mark                                                                          ruth