import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, ToastAndroid, FlatList, Text, Image, } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { CTHeader } from '../Utils/Header';
import { plusIcon } from '../Assets/Icons';
import { useIsFocused } from '@react-navigation/native';


export default function Home({ navigation }) {


    var db = openDatabase({ name: 'database.db' });

    const [data, setData] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {

        _getdata();

    }, [isFocused]);


    const _getdata = () => {
        try {
            let dataArr = [];
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM Users', [], function (tx, res) {
                    // console.log('res', res.rows);
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

    const renderItem = ({ item, index }) => {
        // console.log(item);
        return (
            <View>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontSize: 20 }}>{index + 1}.</Text>
                        <View style={{ width: 10 }} />
                        <View>
                            <Text>Email: {item.email}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Mobile: {item.mobile}</Text>
                        </View>
                    </View>
                    {/* <CustomButton title="Delete" onPress={() => __onDelete(item)} buttonContainerStyle={{backgroundColor:'red'}} /> */}
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('UpdateData', { Data: item })}>
                        <Text style={{ color: 'dodgerblue' }}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <CTHeader
                title='SQLite'
                headerColor='white'
                statusbarStyle='dark-content'
                statusbarColor='lightgrey'
                headerAlign='left'
                rightComp={(
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddData')}
                    >
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={plusIcon} />
                    </TouchableOpacity>)}
            />
            <View style={{ flex: 1, padding: 15, backgroundColor: '#fff' }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
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
        </View>
    );
}
