import { FormGroup } from '@angular/forms';
import { FORM_URL_MAP } from '../models/form-url-map';

export class FormUrlMapperHelper {
    static mapToUrl(form: FormGroup) {
        return FORM_URL_MAP.reduce((obj: any, r) => {
            const { value } = form.get(r.formKey);
            if (value != null) {
                obj[r.queryKey] = r.formUrlMapper
                    ? r.formUrlMapper.toQuery(value)
                    : value;
            }

            return obj;
        }, {});
    }
}
