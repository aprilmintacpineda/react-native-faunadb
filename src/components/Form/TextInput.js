import React from 'react';
import { TextInput as RNTextInput, Text, View } from 'react-native';
import { FormContext } from '.';
import { camelToTitleCase } from 'libs/strings';

function TextInput ({ field, type = 'text' }) {
  const { formValues, onChangeHandlers, formErrors, isSubmitting } =
    React.useContext(FormContext);

  const value = formValues[field];
  const onChangeText = onChangeHandlers[field];
  const error = formErrors[field];

  return (
    <View>
      <RNTextInput
        onChangeText={onChangeText}
        value={value}
        style={{
          borderWidth: 1,
          borderColor: error ? 'red' : '#d0d1d5',
          borderRadius: 4,
          padding: 10
        }}
        secureTextEntry={type === 'password'}
        editable={!isSubmitting}
        selectTextOnFocus={!isSubmitting}
        placeholder={camelToTitleCase(field)}
      />
      <Text style={{ color: 'red', marginBottom: 5 }}>{error}</Text>
    </View>
  );
}

export default React.memo(TextInput);
