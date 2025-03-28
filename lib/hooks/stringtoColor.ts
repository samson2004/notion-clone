function StringtoColor(str?: string) {
    if (!str) return '#000000'; // Default color for empty or undefined input

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '000000'.substring(0, 6 - c.length) + c;
}

export default StringtoColor;
