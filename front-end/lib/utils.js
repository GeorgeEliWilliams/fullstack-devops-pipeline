export function ucwords(str) {
    if (typeof str !== 'string') {
        return str;
    }

    return str
        .toLowerCase() // Convert entire string to lowercase first
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}


export function prepRole(word) {
    // Remove hyphens and capitalize each word
    return word
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .split(' ') // Split the string into words
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toUpperCase()) // Capitalize each word
        .join(' '); // Join the words back into a single string
}


export const DISTRICT_ROLES = ["clma", 'dfp', 'dhmis officer']
export const FACILITY_ROLES = ['fic', 'data collector', "hfmo",]
export const PARTNER_ROLES = ["ssr"]


export function splitLoc(str) {
    // Use split to divide the string at the hyphen and trim whitespace from each part
    const parts = str.split('-').map(part => part.trim());

    // Return the parts if exactly two parts are found; otherwise, return null or handle as needed
    return parts.length === 2 ? parts : null;
}


export function getRandomStatus() {
    const statuses = ["Pending", "In Progress", "Dropped", "Completed"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}// Output: Randomly one of "Pending", "In Progress", "Dropped", or "Completed"