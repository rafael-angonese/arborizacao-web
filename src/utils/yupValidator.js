import * as Yup from 'yup';

async function yupValidator(schema, data) {
  try {
    await schema.validate(data, { abortEarly: false });

    return {};
  } catch (errors) {
    const errorMessages = {};
    if (errors instanceof Yup.ValidationError) {
      errors.inner.forEach((error) => {
        console.log(error)
        // const attribute = I18n.t(`${controller}.attributes.${error.path}`);
        // const message = I18n.t(`form.${error.type}`);

        // let params = '';
        // if (error.params.min) {
        //   params = `${error.params.min} ${I18n.t('form.characters')}`;
        // }
        // if (error.params.max) {
        //   params = `${error.params.max} ${I18n.t('form.characters')}`;
        // }
        errorMessages[error.path] = error.message;

        // errorMessages[error.path] = `${attribute} ${message} ${params}`;
      });
    }

    return errorMessages;
  }
}

export default yupValidator;
