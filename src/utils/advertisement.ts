export const checkTitleLength = (title: string) => {
    let newTitle = '';

    if (title.length > 35) {
        newTitle = title.slice(0, 35) + '...';
    } else {
        newTitle = title;
    }
    return newTitle;
};
