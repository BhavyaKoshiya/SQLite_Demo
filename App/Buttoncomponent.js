import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import colors from './colors';
export function CustomButton({
  buttonContainerStyle,
  buttontitleStyle,
  title,
  ...other
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonContainerStyle]}
      {...other}>
      <Text style={[styles.buttontitle, buttontitleStyle]}>
        {title ? title : 'set the title'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.blue,
    height: 45,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  buttontitle: {color: 'white', fontSize: 17},
});
