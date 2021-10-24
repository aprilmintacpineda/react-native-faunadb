import React from 'react';
import { Button } from 'react-native';
import { FormContext } from '.';

function SubmitButton () {
  const { onSubmit, isSubmitting } = React.useContext(FormContext);

  return (
    <Button
      title="Submit"
      onPress={onSubmit}
      disabled={isSubmitting}
    />
  );
}

export default React.memo(SubmitButton);
