export interface Group {
  name: string,
  description: string;
  students_count: number;
  cost: {
    sum: number,
    currencyCode: string
  };
}
