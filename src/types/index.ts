export interface Character {
    id: number;
    name: string;
    role: string;
    image: string;
    description: string;
    powers: string[];
    quote: string;
    chapter: string;
}

export interface ChapterEvent {
    title: string;
    description: string;
    thumbnail: string;
    quote: string;
}

export interface Chapter {
    id: number;
    title: string;
    subtitle: string;
    events: ChapterEvent[];
}
