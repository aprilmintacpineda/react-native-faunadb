import React from 'react';
import { apolloClient } from 'App';
import useState from 'hooks/useState';

export const FormContext = React.createContext();

function Form ({
  formOptions: {
    initialFormValues,
    validators = null,
    onSubmit = null,
    mutation = null,
    onSuccess = null,
    onFailed = null,
    modifyInput = null,
    refetchQueries = null
  },
  children
}) {
  const [{ formValues, formErrors, status, data }, updateState] =
    useState(() => ({
      formValues: initialFormValues,
      formErrors: {},
      status: 'initial',
      data: null
    }));

  const isSubmitting = status === 'submitting';

  const onChangeHandlers = React.useMemo(() => {
    return Object.keys(initialFormValues).reduce(
      (accumulator, field) => {
        accumulator[field] = value => {
          updateState(({ formValues, formErrors }) => {
            const newFormErrors = formErrors;

            const newFormValues = {
              ...formValues,
              [field]: value
            };

            const validator = validators && validators[field];

            if (validator)
              newFormErrors[field] = validator(newFormValues);

            return {
              formValues: newFormValues,
              formErrors: newFormErrors
            };
          });
        };

        return accumulator;
      },
      {}
    );
  }, [initialFormValues, validators]);

  const validateForm = React.useCallback(() => {
    let hasError = false;
    const newFormErrors = {};

    Object.keys(initialFormValues).forEach(field => {
      let error = '';
      const validator = validators && validators[field];
      if (validator) error = validator(formValues);
      if (error) hasError = true;
      newFormErrors[field] = error;
    });

    if (hasError) {
      updateState({
        status: 'formValidationFailed',
        formErrors: newFormErrors
      });
    }

    return hasError;
  }, [initialFormValues, formValues, updateState, validators]);

  const handleSubmit = React.useCallback(async () => {
    try {
      if (isSubmitting) return;
      const validationErrors = validateForm();
      if (validationErrors) return;
      updateState({ status: 'submitting' });

      let data = null;

      if (onSubmit) {
        data = await onSubmit({ formValues });
      } else {
        const input = modifyInput
          ? modifyInput(formValues)
          : formValues;

        const result = await apolloClient.mutate({
          mutation,
          variables: { data: input },
          refetchQueries
        });

        const mutationName =
          mutation.definitions[0].selectionSet.selections[0].name
            .value;

        data = result.data[mutationName];
      }

      updateState({
        status: 'submitSuccess',
        data: data || null
      });

      if (onSuccess) await onSuccess({ formValues, data });
    } catch (error) {
      console.log(error);
      updateState({ status: 'submitError' });

      if (onFailed) await onFailed(error);
    }
  }, [
    onSubmit,
    formValues,
    validateForm,
    isSubmitting,
    mutation,
    onSuccess,
    modifyInput,
    onFailed,
    refetchQueries
  ]);

  return (
    <FormContext.Provider
      value={{
        formValues,
        formErrors,
        onChangeHandlers,
        onSubmit: handleSubmit,
        status,
        isSubmitting,
        data
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default React.memo(Form);
