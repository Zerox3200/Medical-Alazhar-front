export const timeFromMinutes = (minutes) => {
    const parsedMinutes = parseInt(minutes);

    const hours = Math.floor(parsedMinutes / 60);
    const remainingMinutes = parsedMinutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
        return `${hours} hours`;
    }

    return `${hours}h ${remainingMinutes}m`;
}
