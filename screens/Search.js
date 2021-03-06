import React, { useState } from 'react';
import { TextInput, Button,Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Search = ({navigation}) => {
    const [city, setCity] = useState();
    const [cities,setCities] = useState([])
    const fetchCities = (text) => {
        setCity(text)
        fetch("https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query="+text+"&locationType=city&format=json")
        .then(res=>res.json())
        .then(data=>{
            setCities(data.location.address.slice(0,9))
            console.log(data.location.address.slice(0,9))})
            
    }
    const btnClick =async() => {
        await AsyncStorage.setItem("newcity",city)
        navigation.navigate("home",{city:city})
        console.log(city)
    }
    const listClick = async(cityName) => {
        setCity(cityName)
        await AsyncStorage.setItem("newcity",cityName)
        navigation.navigate("home",{city:cityName})
        console.log(city)
    }
    return (
        <View style={{ flex: 1 }}>
            <Header name="Weather App"></Header>
            <TextInput label="city name"
                theme={{ colors: { primary: "#00aaff" } }}
                value={city}
                onChangeText={(text) =>fetchCities(text)}>

            </TextInput>
            <Button icon="content-save" mode="contained" onPress={() =>btnClick()} theme={{colors:{primary:"#00aaff"}}} style={{margin:20}}>
                <Text style={{color:"white"}}>Search</Text>
            </Button>
            <FlatList data={cities} renderItem={({item}) => {
                return(
                    <Card style={{margin:2,padding:12}} onPress={()=>listClick(item)
                        
                    }>
                        <Text>{item}</Text>
                    </Card>
                )
            }}
            keyExtractor={item => item}></FlatList>
        </View>
    );
};

export default Search;