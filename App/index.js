import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, ToastAndroid, FlatList, Text, } from 'react-native';
import { CustomButton } from './Buttoncomponent';
import { TextInputComponent } from './TextInputComponent';
import { openDatabase } from 'react-native-sqlite-storage';


export default function Index() {


  var db = openDatabase({ name: 'database.db' });

  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addMobile, setAddMobile] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateMobile, setUpdateMobile] = useState('');
  const [data, setData] = useState([]);


  useEffect(() => {
    _getdata();
  }, []);


  const _getdata = () => {
    try {
      let dataArr = [];
      db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM Users', [], function (tx, res) {
          console.log('res', res.rows);
          if (res.rows.length !== 0) {
            for (let i = 0; i < res.rows.length; i++) {
              dataArr.push(res.rows.item(i));
              setData(dataArr);
            }
          } else {
            setData([])
          }
        });
      });
    } catch (e) {
      console.log('Error : ', e);
    }
  };


  const __onAdd = () => {
    if (addEmail === '' || addName === '') {
      ToastAndroid.show('Enter all Field', ToastAndroid.SHORT);
    } else {
      try {
        db.transaction(function (txn) {
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS Users (email VARCHAR(50) PRIMARY KEY NOT NULL, name VARCHAR(50), mobile INTEGER(10))',
          ),
            [];
        });

        db.transaction(function (txn) {
          let insetQuery = `INSERT INTO Users (email, name, mobile) VALUES ("${addEmail}","${addName}","${addMobile}");`;
          txn.executeSql(insetQuery);
        });
      } catch (error) {
        console.log('error');
      }
    }
    _getdata();
  };


  const __onUpdate = () => {
    if (updateEmail === '' || updateName === '') {
      ToastAndroid.show('Enter all Field', ToastAndroid.SHORT);
    } else {
      try {
        db.transaction(function (txn) {
          let insetQuery = `UPDATE Users SET name="${updateName}", mobile="${updateMobile}" WHERE email="${updateEmail}";`;
          txn.executeSql(insetQuery);
        });
      } catch (e) {
        console.log('Error : ', e);
      }
    }
    _getdata();
  };


  const __onDelete = (item) => {
    console.log(item);
    try {
      db.transaction(function (txn) {
        let insetQuery = `DELETE FROM Users WHERE email="${item.email}";`;
        txn.executeSql(insetQuery);
      });
    } catch (e) {
      console.log('Error : ', e);
    }
    _getdata();
  };


  const renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <View>
        <View style={{ height: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row',}}>
            <Text style={{ fontSize: 20 }}>{index + 1}.</Text>
            <View style={{ width: 10 }} />
            <View>
              <Text>Email: {item.email}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Mobile: {item.mobile}</Text>
            </View>
          </View>
          {/* <CustomButton title="Delete" onPress={() => __onDelete(item)} buttonContainerStyle={{backgroundColor:'red'}} /> */}
          <TouchableOpacity onPress={() => __onDelete(item)}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ height: 10 }} />
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
      <CustomButton title="Add" onPress={__onAdd} />
      <View style={{ height: 10 }} />
      <TextInputComponent
        placeholder="Email"
        onChangeText={(text) => setUpdateEmail(text)}
        value={updateEmail}
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
      <CustomButton title="Update" onPress={__onUpdate} />
      <View style={{ height: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {/* <Text>index</Text> */}
        <Text style={{ fontSize: 16 }}>=============</Text>
        <Text style={{ fontSize: 16 }}>User Data</Text>
        <Text style={{ fontSize: 16 }}>=============</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
      />
    </View>
  );
}
