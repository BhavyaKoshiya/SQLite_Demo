import React, { useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { CustomButton } from '../Utils/Buttoncomponent';
import { TextInputComponent } from '../Utils/TextInputComponent';
import { openDatabase } from 'react-native-sqlite-storage';
import { CTHeader } from '../Utils/Header';


export default function AddData({ navigation }) {

    var db = openDatabase({ name: 'database.db' });

    const [addName, setAddName] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addMobile, setAddMobile] = useState('');
    const [checkEmail, setCheckEmail] = useState('');

    const validateEmail = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

        return expression.test(String(email).toLowerCase())
    }

    const __onAdd = () => {
        if (addEmail === '' || addName === '') {
            // console.log(validateEmail(addEmail));

            ToastAndroid.show('Enter all Field', ToastAndroid.SHORT);
        } else {
            if (validateEmail(addEmail)) {
                if (addMobile.length == 10) {
                    try {
                        db.transaction(function (txn) {
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS Users (email VARCHAR(50) PRIMARY KEY NOT NULL, name VARCHAR(50), mobile INTEGER(10))',
                            ), [];
                        });
                        db.transaction(function (txn) {
                            txn.executeSql(`SELECT email FROM Users WHERE email="${addEmail}";`, [], function (tx, res) {
                                if (JSON.stringify(res.rows.length) == '0') {
                                    console.log('checkEmail', checkEmail);
                                    let insetQuery = `INSERT INTO Users (email, name, mobile) VALUES ("${addEmail}","${addName}","${addMobile}");`;
                                    txn.executeSql(insetQuery);
                                    ToastAndroid.show('Record Added..', ToastAndroid.SHORT);
                                    navigation.goBack();
                                } else if (JSON.stringify(res.rows.length) == '1') {
                                    ToastAndroid.show('Record with this Email already exist..', ToastAndroid.SHORT);
                                }
                            });
                        });
                    } catch (error) {
                        console.log('error');
                    }
                } else {
                    ToastAndroid.show('Please enter valid Mobile Number', ToastAndroid.SHORT);

                }

            } else {
                ToastAndroid.show('Please enter valid Email', ToastAndroid.SHORT);

            }
        }
        // _getdata();
    };


    return (
        <View style={{ flex: 1 }}>
            <CTHeader
                title='ADD DATA'
                headerColor='white'
                statusbarStyle='dark-content'
                statusbarColor='white'
                headerAlign='left'
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.container}>

                <TextInputComponent
                    placeholder="Email"
                    onChangeText={(text) => setAddEmail(text)}
                    value={addEmail}
                    keyboardType="email-address"
                />
                <View style={{ height: 10 }} />
                <TextInputComponent
                    placeholder="Name"
                    onChangeText={(text) => setAddName(text)}
                    value={addName}
                />
                <View style={{ height: 10 }} />
                <TextInputComponent
                    placeholder="Mobile Number"
                    keyboardType='numeric'
                    onChangeText={(text) => setAddMobile(text)}
                    value={addMobile}
                />
                <View style={{ height: 10 }} />
                <CustomButton title="ADD DATA" onPress={__onAdd} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
});