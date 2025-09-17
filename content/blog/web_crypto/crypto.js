function getMessageEncoding() {
  const messageBox = document.querySelector("#enc_txt");
  let message = messageBox.innerHTML;
  let enc = new TextEncoder();
  console.log(message)
  console.log(enc)
  return enc.encode(message);
}

function encryptMessage(publicKey) {
  let encoded = getMessageEncoding();
  return window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoded,
  );
}

console.log(encryptMessage("asd"));



let cipherText;

// generate the public/private key pair
window.crypto.subtle.generateKey(
{
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256"
},
true,
["encrypt", "decrypt"])
.then((keyPair) => {
    let encoder = new TextEncoder();
    let decoder = new TextDecoder("utf-8");
    window.crypto.subtle.exportKey("jwk", keyPair.publicKey).then(result => {
        // Show the public key in JSON form
        document.querySelector("#public_key").value = JSON.stringify(result);
    });
    window.crypto.subtle.exportKey("jwk", keyPair.privateKey).then(result => {
        // Show the private key in JSON form
        document.querySelector("#private_key").value = JSON.stringify(result);
    });
    const encryptButton = document.querySelector("#btn_encrypt");
    encryptButton.addEventListener("click", () => {
        // stash the message from the input
        const message = document.querySelector("#input_message").value;
        let encoded = new TextEncoder().encode(message);
        // encrypt the message with the public key
        window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        keyPair.publicKey,
        encoded
        ).then(result => {
            // stash the encrypted result for decryption later
            cipherText = result;
            // show a base64 encoded version of the encrypted message
            document.querySelector("#encrypted_message").value = btoa(cipherText);
        });
    });
    const decryptButton = document.querySelector("#btn_decrypt");
    decryptButton.addEventListener("click", () => {
        // decrypt the message, with the private key
        window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        keyPair.privateKey,
        cipherText
        ).then(result => {
            // after decryption, show the original message
            document.querySelector("#decrypted_message").value = decoder.decode(result);
        });
    });
});
