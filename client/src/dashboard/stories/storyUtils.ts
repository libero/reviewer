const getMockSubmissionForDaysAgo = (daysAgo: number): number => {
    const date = new Date();
    date.setDate(new Date().getDate() - daysAgo);
    return date.getTime();
};

export default getMockSubmissionForDaysAgo;
