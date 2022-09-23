const manageColor = (color) => {
    let teamColor = '';
    if (color === 'red') {
        teamColor = 'text-red-600 bg-red-100';
    } else if (color === 'green') {
        teamColor = 'text-green-600 bg-green-100';
    } else if (color === 'yellow') {
        teamColor = 'text-yellow-600 bg-yellow-100';
    } else if (color === 'violet') {
        teamColor = 'text-violet-600 bg-violet-100';
    } else if (color === 'pink') {
        teamColor = 'text-pink-600 bg-pink-100';
    } else if (color === 'orange') {
        teamColor = 'text-orange-600 bg-orange-100';
    } else if (color === 'teal') {
        teamColor = 'text-teal-600 bg-teal-100';
    }

    return teamColor;
}

export default manageColor;