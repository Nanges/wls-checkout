export interface LabelledValue{
    label: string;
    value: string;
}

export interface Data{
    destinations: LabelledValue[];
    types: LabelledValue[];
    attendants:LabelledValue[];
    countries: LabelledValue[];
}

export class Settings {
    data: Data;
}