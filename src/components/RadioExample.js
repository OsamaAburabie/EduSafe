import React from 'react';
import {View, Text} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import {useFormik} from 'formik';
const RadioExample = () => {
  const formik = useFormik({
    initialValues: {gender: ''},
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <View>
      <RadioButton.Group
        onValueChange={formik.handleChange('gender')}
        value={formik.values.gender}>
        <View>
          <Text>Male</Text>
          <RadioButton value="M"></RadioButton>
        </View>
        <View>
          <Text>Female</Text>
          <RadioButton value="F"></RadioButton>
        </View>
      </RadioButton.Group>
      <Button mode="contained" title="submit" onPress={formik.handleSubmit}>
        Enter
      </Button>
    </View>
  );
};

export default RadioExample;
