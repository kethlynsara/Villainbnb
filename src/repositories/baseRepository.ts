export interface Base {
    id: number,
    title: string,
    facade: string,
    city: string,
    technology: string
};

export type CreateBaseData = Omit<Base, "id">;