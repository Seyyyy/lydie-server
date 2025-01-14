const storeTitles = [
    "Downtown Diner",
    "Sunny Cafe",
    "Lakeview Restaurant",
    "Moonlight Lounge",
    "Riverside Bakery"
];

export const storeFactory = (userId: string, filePath: string) => {
    const randomIndex = Math.floor(Math.random() * storeTitles.length);
    const generatedTitle = storeTitles[randomIndex];

    return {
        title: generatedTitle,
        userId: userId,
        image: {
            create: {
                filePath: filePath,
                fileExtension: "png",
            },
        },
    };
}