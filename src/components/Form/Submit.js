import React from 'react';
import { Button } from 'react-native';
import { FormContext } from '.';

function SubmitButton ({ onSubmit: _onSubmit }) {
  const { onSubmit, isSubmitting } = React.useContext(FormContext);

  return (
    <Button
      title="Submit"
      onPress={_onSubmit || onSubmit}
      disabled={isSubmitting}
    />
  );
}

export default React.memo(SubmitButton);
