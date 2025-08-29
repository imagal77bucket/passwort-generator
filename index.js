const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const generatePassword = (length, useSpecialChars, includeNumbers, includeUppercase) => {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = lowerChars;
    if (includeUppercase) characters += upperChars;
    if (includeNumbers) characters += numbers;
    if (useSpecialChars) characters += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, characters.length);
        password += characters[randomIndex];
    }
    return password;
};

rl.question('Wie lang soll das Passwort sein? ', (length) => {
    length = parseInt(length);
    rl.question('Sonderzeichen einbeziehen? (ja/nein) ', (useSpecialChars) => {
        // Parse input as boolean
        useSpecialChars = useSpecialChars === 'ja';
        rl.question('Zahlen einbeziehen? (ja/nein) ', (includeNumbers) => {
            // Parse input as boolean
            includeNumbers = includeNumbers === 'ja';
            rl.question('Großbuchstaben einbeziehen? (ja/nein) ', (includeUppercase) => {
                // Parse input as boolean
                includeUppercase = includeUppercase === 'ja';
                const password = generatePassword(length, useSpecialChars, includeNumbers, includeUppercase);
                console.log(`Generiertes Passwort: ${password}`);
                rl.close();
            });
        });
    });
});