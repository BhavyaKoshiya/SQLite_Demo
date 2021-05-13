import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { arrowLeftIcon } from '../Assets/Icons'
import PropTypes from 'prop-types';

export function CTHeader({
    title,
    headerTitleStyle,
    subtitle,
    headerSubtitleStyle,
    source,
    onBackPress,
    backButtonStyle,
    backIconStyle,
    headerAlign,
    rightComp,
    rightCompContainerStyle,
    leftComp,
    headerColor,
    leftCompContainerStyle,
    headerContainerStyle,
    statusbarStyle,
    statusbarColor,
}) {
    return (
        <View style={[styles.headerContainer, { backgroundColor: headerColor || '#f9aa33' }, headerContainerStyle]}>
            <StatusBar barStyle={statusbarStyle || 'dark-content'} backgroundColor={statusbarColor || headerColor || 'white'} />
            {onBackPress ?
                <TouchableOpacity
                    style={{
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...backButtonStyle
                    }}
                    onPress={onBackPress}
                >
                    <Image
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            ...backIconStyle
                        }}
                        source={source ? source : arrowLeftIcon}
                    />

                </TouchableOpacity>
                :
                leftComp ?
                    <View style={{
                        height: '100%',
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...leftCompContainerStyle
                    }}>
                        {leftComp}
                    </View>
                    :
                    <View style={{ width: 60, height: '100%', }} />
            }
            <View style={{ flex: 1, height: '100%', justifyContent: 'center', }}>
                <Text style={{
                    fontSize: 20,
                    width: '100%',
                    color:"#000",
                    textAlign: headerAlign ? headerAlign : 'center',
                    ...headerTitleStyle
                }}>{title}</Text>
                {subtitle &&
                    <Text style={{
                        fontSize: 12,
                        width: '100%',
                        color:"#000",
                        textAlign: headerAlign ? headerAlign : 'center',
                        ...headerSubtitleStyle
                    }}>{subtitle}</Text>}
            </View>
            <View style={{
                height: '100%',
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                ...rightCompContainerStyle
            }}>
                {rightComp}
            </View>
        </View >
    );
};

CTHeader.propTypes = {
    title: PropTypes.string.isRequired,
    headerTitleStyle: PropTypes.object,
    subtitle: PropTypes.string,
    headerSubtitleStyle: PropTypes.object,
    source: PropTypes.any,
    onBackPress: PropTypes.func,
    backButtonStyle: PropTypes.object,
    backIconStyle: PropTypes.object,
    headerAlign: PropTypes.oneOf(['auto', 'center', 'left', 'right', 'justify']),
    rightComp: PropTypes.object,
    rightCompContainerStyle: PropTypes.object,
    leftComp: PropTypes.object,
    leftCompContainerStyle: PropTypes.object,
    headerContainerStyle: PropTypes.object,
    headerColor: PropTypes.string,
    statusbarStyle: PropTypes.string,
    statusbarColor: PropTypes.string,
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        elevation:10,
        alignItems: 'center',
        flexDirection: 'row',
    }
});
