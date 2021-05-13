import React, { useState } from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { CustomButton } from '../Utils/Buttoncomponent';
import { TextInputComponent } from '../Utils/TextInputComponent';
import { openDatabase } from 'react-native-sqlite-storage';
import { CTHeader } from '../Utils/Header';


export default function UpdateData({ navigation, route }) {

    var db = openDatabase({ name: 'database.db' });
    console.log(Data);
    const Data = route.params.Data;

    const [updateName, setUpdateName] = useState(Data.name);
    const [updateEmail, setUpdateEmail] = useState(Data.email);
    const [updateMobile, setUpdateMobile] = useState(Data.mobile.toString());

    const __onUpdate = () => {
        if (updateEmail === '' || updateName === '') {
            ToastAndroid.show('Enter all Field', ToastAndroid.SHORT);
        } else {
            if (updateMobile.length == 10) {
                try {
                    db.transaction(function (txn) {
                        let insetQuery = `UPDATE Users SET name="${updateName}", mobile="${updateMobile}" WHERE email="${updateEmail}";`;
                        txn.executeSql(insetQuery);
                        ToastAndroid.show('Record Updated..', ToastAndroid.SHORT);
                        navigation.goBack();
                    });
                } catch (e) {
                    console.log('Error : ', e);
                }
            } else {
                ToastAndroid.show('Please enter valid Mobile Number', ToastAndroid.SHORT);

            }
        }
    };

    const __onDelete = (item) => {
        console.log(item);
        try {
            db.transaction(function (txn) {
                let insetQuery = `DELETE FROM Users WHERE email="${item}";`;
                txn.executeSql(insetQuery);
                ToastAndroid.show('Record Deleted..', ToastAndroid.SHORT);
                navigation.goBack();
            });
        } catch (e) {
            console.log('Error : ', e);
        }
    };

    const deleteAlert = () => {
        Alert.alert(
            "Are you Sure?",
            "Do you really want to delete this record? This Process cannot be undone.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion Canceled"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => __onDelete(updateEmail) }
            ])
    }


    return (
        <View style={{ flex: 1 }}>
            <CTHeader
                title='UPDATE DATA'
                headerColor='white'
                statusbarStyle='dark-content'
                statusbarColor='white'
                headerAlign='left'
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.container}>
                <TextInputComponent
                    placeholder="Email"
                    onChangeText={(text) => setUpdateEmail(text)}
                    value={updateEmail}
                    editable={false}
                    keyboardType="email-address"
                />
                <View style={{ height: 10 }} />
                <TextInputComponent
                    placeholder="Name"
                    onChangeText={(text) => setUpdateName(text)}
                    value={updateName}
                />
                <View style={{ height: 10 }} />
                <TextInputComponent
                    placeholder="Mobile Number"
                    keyboardType='numeric'
                    onChangeText={(text) => setUpdateMobile(text)}
                    value={updateMobile}
                />
                <View style={{ height: 10 }} />
                <CustomButton title="UPDATE DATA" onPress={__onUpdate} />
                <View style={{ height: 10 }} />
                <CustomButton title="DELETE DATA" onPress={deleteAlert}
                    buttonContainerStyle={{ backgroundColor: 'red' }} />
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