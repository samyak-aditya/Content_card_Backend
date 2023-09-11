//const NodeRSA = require('node-rsa');
//const fs = require('fs');
import fs from 'fs';
import NodeRSA from 'node-rsa';

// Create an instance of NodeRSA
const key = new NodeRSA({ b: 2048 }); // You can adjust the key size (bits) as needed

// Generate key pair
const privatePem = key.exportKey('private');
const publicPem = key.exportKey('public');

// Save private and public keys to files
fs.writeFileSync('private_key.pem', privatePem);
fs.writeFileSync('public_key.pem', publicPem);
