import React from 'react';  
import {View, Text , StyleSheet, PermissionsAndroid,Platform} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import CustomHeader from '../Component/CustomHeader';
import {customStyle} from '../../../Helper/Constants';
import Permissions from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import TracksData from '../../../Helper/TracksData';


const myStyle = StyleSheet.create({
    container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    },
    MainBody : {
        backgroundColor : customStyle.bodyBGColor,
        height : '100%'
    }
});



class RunningTrack extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
        this.state = {
            currentLongitude: -122.7594661,//Initial Longitude
            currentLatitude: 49.1639525,//Initial Latitude
        }
    }
    watchID = null;
    componentDidMount = () => {

        //console.log(TracksData);

        Permissions.check('location').then(response => {
            if (response != 'authorized') {
                alert( "Location not allowed");
            } else {
                console.log("Location ok");
                Geolocation.getCurrentPosition(
                    position => {
                        //alert(position)
                        const initialPosition = JSON.stringify(position);
                        console.log(initialPosition);
                        this.setState({
                                currentLongitude: position.coords.longitude,
                                currentLatitude: position.coords.latitude
                        }); 
                        //alert(position.coords)
                    },
                    error => alert(JSON.stringify(error)),
                    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
                );
                this.watchID = Geolocation.watchPosition(position => {
                    //alert(position)
                    const lastPosition = JSON.stringify(position);
                    console.log(lastPosition);
                    this.setState({
                        currentLongitude: position.coords.longitude,
                        currentLatitude: position.coords.latitude
                    }); 
                });
            }
          })
    }

     componentWillUnmount = () => {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
     }

    render ( ) {
        const marker = {
            Latlng : {
                latitude: this.state.currentLatitude,
                longitude: this.state.currentLongitude,
            },
            title : "Location",
            description : "My Position"
        }

        const region = {
            latitude:  this.state.currentLatitude,
            longitude: this.state.currentLongitude,
            latitudeDelta: 0.7222,
            longitudeDelta: 0.9421,
        }
        console.log(marker);
        return (
            <View >
                <CustomHeader  title = "RUNNING TRACK"/>
                <View style = {myStyle.MainBody}>
                    <MapView
                        style={myStyle.map}
                        initialRegion={region}
                        showsUserLocation={true}
                        region={region}
                    >
                        <Marker
                            pinColor = "blue"
                            coordinate={marker.Latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                        {
                            TracksData.map((track, index) =>(
                                <Marker
                                    key = {index}
                                    coordinate={track.coords}
                                    title={track.title}
                                    description={track.desp}
                                />
                            ))
                        }
                    </MapView>
                </View>
            </View>
        );
    }
}

export default RunningTrack;