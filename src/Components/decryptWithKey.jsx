import React from 'react'

async function decryptWithKey(base64Data, customKey) {
    try {
        // 1. Convert base64 to ArrayBuffer
        const binaryData = atob(base64Data);
        const dataBuffer = new Uint8Array([...binaryData].map(char => char.charCodeAt(0)));

        const iv = dataBuffer.slice(0, 16);
        const encryptedData = dataBuffer.slice(16);

        // 2. Hash the custom key with SHA-256
        const keyBuffer = new TextEncoder().encode(customKey);
        const hashedKey = await crypto.subtle.digest('SHA-256', keyBuffer);

        // 3. Import the hashed key
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            hashedKey,
            { name: 'AES-CBC' },
            false,
            ['decrypt']
        );

        // 4. Decrypt
        const decryptedBuffer = await crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: iv
            },
            cryptoKey,
            encryptedData
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedBuffer);

    } catch (err) {
        console.error('WebCrypto decryption failed:', err);
        return null;
    }
}

export default decryptWithKey;