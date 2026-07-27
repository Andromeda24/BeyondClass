
export interface CostItem {
  id: string;
  concept: string;
  value: number;
}

export type Activity = {
    id: string;
    name: string;
    description: string;
    weekday: string;
    time: string;
    levels:string;
    cost:number;
    txtoptionalcosts:string;
    optionals:[CostItem];
    imageUrl:string;
    match: string;

  }

  export type Student = {
    id: string;
    displayName: string;
    fullName: string;
    level: number;
    parent: string;
  };

