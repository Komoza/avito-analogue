export const checkTitleLength = (title: string) => {
    let newTitle = '';

    if (title.length > 35) {
        newTitle = title.slice(0, 35) + '...';
    } else {
        newTitle = title;
    }
    return newTitle;
};

export const formatDate = (inputDate: string) => {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const [year, monthIndex] = inputDate.split('-');
    const formattedDate = `${months[parseInt(monthIndex, 10) - 1]} ${year}`;

    return formattedDate;
};

export const formateNumber = (phoneNumber: string) => {
    let formatedNumber = '';
    let countDig = 0;

    for (let i = 0; i < phoneNumber.length; i++) {
        if (!isNaN(Number(phoneNumber[i])) && phoneNumber[i] !== ' ') {
            if (countDig < 4) {
                formatedNumber += phoneNumber[i];
                countDig++;
            } else {
                formatedNumber += 'X';
            }
        } else {
            formatedNumber += phoneNumber[i];
        }
    }

    return formatedNumber;
};
