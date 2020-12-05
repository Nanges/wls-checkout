export interface LabelledValue{
    label: string;
    value: string;
}

export interface Data{
    destinations: LabelledValue[];
    types: LabelledValue[];
    attendants:LabelledValue[];
}

export class Settings {
    data: Data;
}