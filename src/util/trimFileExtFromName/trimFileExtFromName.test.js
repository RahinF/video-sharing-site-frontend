import trimFileExtFromName from ".";

test("if file extenstion is removed", () => {
    const filename = "file.name.jpg";
    const fileNameWithoutExt = trimFileExtFromName(filename);

    expect(fileNameWithoutExt).toBe("file.name");
});
