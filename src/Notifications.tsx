import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Heading, Text } from './shared';
import { Keyboard, ActivityIndicator } from 'react-native';
import {
  tryGetUserByPushTokenAsync,
  getPushTokenAsync,
  storePushTokenForUserAsync,
} from './push-notifications';
import { limeGreen, red } from './shared/colours';
import { Formik, FormikProps, } from 'formik';
import * as Yup from "yup";

export declare type Notification = {
  origin: 'selected' | 'received';
  data: any;
  remote: boolean;
  isMultiple: boolean;
};

type FormValues = {
  name: string,
  pushToken: string,
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .strict(false)
    .trim()
    .max(19, 'Max 20 characters')
    .required('Name is required'),
});

export const NotificationsScreen = () => {
  const [hasRegisteredForPushNotifications, setHasRegisteredForPushNotifications] = useState<boolean>(false);

  const onSubmit = async ({ name, pushToken }: FormValues) => {
    Keyboard.dismiss();
    await storePushTokenForUserAsync(name.trim(), pushToken);
    setHasRegisteredForPushNotifications(true);
  };

  return (
    <Container>
      <Heading>Notifications</Heading>
      <Formik
        initialValues={{ name: '', pushToken: null }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {props =>
          <PushNotificationsForm
            {...props}
            hasRegisteredForPushNotifications={hasRegisteredForPushNotifications}
            setHasRegisteredForPushNotifications={setHasRegisteredForPushNotifications}
          />}
      </Formik>
    </Container>
  );
};

type Props = {
  hasRegisteredForPushNotifications: boolean,
  setHasRegisteredForPushNotifications: (value: boolean) => void,
} & FormikProps<FormValues>;

const PushNotificationsForm = (
  {
    handleChange, handleBlur, handleSubmit, values: { name }, errors, touched, setFieldValue,
    hasRegisteredForPushNotifications, setHasRegisteredForPushNotifications,
  }: Props) => {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPushTokenAsync()
      .then(pushToken => tryGetUserByPushTokenAsync(pushToken)
        .then(user => {
          setFieldValue('pushToken', pushToken);
          if (user != null) {
            setFieldValue('name', user.name);
            setHasRegisteredForPushNotifications(true);
          }
          setLoading(false);
        }))
      .catch(error => {
        console.error('error when storing pushToken', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (hasRegisteredForPushNotifications) {
    return (<Text>You have successfully registered for notifications as {name}</Text>);
  }

  return (
    <>
      <Text colour={red}>{errors.name && touched.name ? errors.name : ''}</Text>
      <TextInput
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={name}
        placeholder="Enter your name"
        autoCompleteType="name"
      />
      <Button onPress={() => handleSubmit()} disabled={!!errors.name}>
        <Text>Register for push notifications</Text>
      </Button>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${limeGreen};
  border-radius: 2px;
  margin: 20px;
`;

const TextInput = styled.TextInput`
  font-size: 20px;
  padding: 10px;
  border: 1px solid ${limeGreen};
`;
