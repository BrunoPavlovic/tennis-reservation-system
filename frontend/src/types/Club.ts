export interface Club{
    clubId: number;
    name: string;
    creditPrice: number;
    createdAt: string;
}

export interface ClubAdmin{
    clubId: number;
    name: string;
    creditPrice: number;
    createdAt: string;
    courtCount: number;
    memberCount: number;
}