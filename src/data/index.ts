import type { Character, Chapter } from '../types';

export const characters: Character[] = [
    {
        id: 1,
        name: "Rocky Bhai",
        role: "King of KGF",
        image: "/images/characters/rocky.png",
        description: "A ruthless and ambitious man who rises from the streets to become the undisputed king of the Kolar Gold Fields.",
        powers: ["Strategic Mastermind", "Fearless Leader", "Combat Expert"],
        quote: "Violence, Violence, Violence... I don't like violence, I love it!",
        chapter: "1 & 2"
    },
    {
        id: 2,
        name: "Reena",
        role: "The Queen",
        image: "/images/characters/reena.png",
        description: "The love interest of Rocky and the daughter of Rajendra Desai, who becomes an integral part of Rocky's life.",
        powers: ["Emotional Strength", "Loyal Companion"],
        quote: "Your world is different, Rocky.",
        chapter: "1 & 2"
    },
    {
        id: 3,
        name: "Garuda",
        role: "The Antagonist (Ch 1)",
        image: "/assets/garuda.png",
        description: "The ruthless son of Suryavardhan who controlled KGF with an iron fist before Rocky's arrival.",
        powers: ["Ruthless Dictator", "Powerful Influence"],
        quote: "Fear is the only bridge to power.",
        chapter: "1"
    },
    {
        id: 4,
        name: "Adheera",
        role: "The Viking-like Villain (Ch 2)",
        image: "/images/characters/adheera.png",
        description: "The legendary warrior and brother of Suryavardhan who returns to reclaim KGF.",
        powers: ["Incredible Strength", "Viking Combat", "Resilience"],
        quote: "I want my kingdom back.",
        chapter: "2"
    }
];

export const chapters: Chapter[] = [
    {
        id: 1,
        title: "Chapter 1",
        subtitle: "Rise to Power",
        events: [
            {
                title: "Rocky's Entry into KGF",
                description: "Rocky enters the Kolar Gold Fields as a slave to overthrow the oppressors.",
                thumbnail: "/images/chapter-thumbnails/entry.png",
                quote: "If you gain courage because a thousand people are standing behind you, then you can only win a war."
            },
            {
                title: "The Battle with Garuda",
                description: "An epic confrontation that ends in the fall of the tyrant and the rise of a new king.",
                thumbnail: "/images/chapter-thumbnails/battle.png",
                quote: "He is the monster... he is Rocky!"
            }
        ]
    },
    {
        id: 2,
        title: "Chapter 2",
        subtitle: "Building the Empire",
        events: [
            {
                title: "Consolidation of Power",
                description: "Rocky transforms KGF into a fortress and an independent empire.",
                thumbnail: "/images/chapter-thumbnails/empire.png",
                quote: "Powerful people come from powerful places."
            },
            {
                title: "The Epic Finale",
                description: "The ultimate clash with Adheera and the world's most powerful political figures.",
                thumbnail: "/images/chapter-thumbnails/finale.png",
                quote: "I had a dream... of gold!"
            }
        ]
    }
];
