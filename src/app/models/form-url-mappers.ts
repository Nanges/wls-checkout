export interface FormUrlMapper<TQuery, TForm> {
    fromQuery(value: TQuery): TForm;
    toQuery(value: TForm): TQuery;
}

export class DateMapper implements FormUrlMapper<string, Date> {
    fromQuery(value: string): Date {
        return new Date(+value);
    }

    toQuery(value: Date): string {
        return value.getTime().toString();
    }
}

export class ArrayMapper implements FormUrlMapper<string, string[]> {
    fromQuery(value: string): string[] {
        return value.split(',');
    }

    toQuery(value: string[]): string {
        return value.length > 0 ? value.join(',') : null;
    }
}
