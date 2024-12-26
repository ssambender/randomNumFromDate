// Generate random number between (and including) min and max
var minNumber = 1;
var maxNumber = 50;

function getRandomNumberFromDate(month, day, year) {
    const dateStr = `${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}${String(year % 100).padStart(2, '0')}`;
    
    // Hash date string w/ SHA-256
    const encoder = new TextEncoder();
    const data = encoder.encode(dateStr);
    
    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        // Convert hash to hexadecimal
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Convert hash to number
        const hashInt = BigInt('0x' + hashHex);
        
        // Convert maxNumber to BigInt
        const maxRange = BigInt(maxNumber - minNumber + 1);
        
        // Scale number to range
        const randomNumber = Number(hashInt % maxRange) + minNumber;
        
        return randomNumber;
    });
}

const month = 12;
const day = 26;
const year = 2024;
getRandomNumberFromDate(month, day, year).then(randomNumber => {
    console.log(randomNumber);
});
