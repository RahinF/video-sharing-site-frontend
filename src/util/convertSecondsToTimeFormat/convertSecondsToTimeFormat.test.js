import convertSecondsToTimeFormat from ".";


test("if seconds are converted to time format", () => {
    const seconds = 5;
    const time = convertSecondsToTimeFormat(seconds);

    expect(time).toBe("00:05");
});

test("if seconds are converted to minutes", () => {
    const seconds = 60;
    const time = convertSecondsToTimeFormat(seconds);

    expect(time).toBe("01:00");
});

test("if seconds are converted to hours", () => {
    const seconds = 60 * 60;
    const time = convertSecondsToTimeFormat(seconds);

    expect(time).toBe("01:00:00");
});

test("if seconds are greater than 1 day", () => {
    const seconds = 60 * 60 * 24;
    const time = convertSecondsToTimeFormat(seconds);

    expect(time).toBe("24:00:00");
});