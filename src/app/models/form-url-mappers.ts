export interface FormUrlMapper<TQuery, TForm>{
    fromQuery(value: TQuery): TForm;
    toQuery(value: TForm): TQuery;
}

export class DateMapper implements FormUrlMapper<string, Date>{
    fromQuery(value: string): Date {
        return new Date(+value);
    }

    toQuery(value: Date): string {
        return value.getTime().toString();
    }
}