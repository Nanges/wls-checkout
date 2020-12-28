import { FormUrlMapper } from "./form-url-mappers";

export interface FormUrlMappingRule {
    queryKey: string;
    formKey: string;
    formParent: string;
    formUrlMapper?: FormUrlMapper<any, any>;
}