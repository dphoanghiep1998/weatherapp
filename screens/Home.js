import React, { useState,useEffect } from 'react';
import { TextInput, Button,Card, Title } from 'react-native-paper';
import { View, Text, FlatList,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from  "./Header"

const Home = (props) => {
    const [info,setInfo] = useState({
        name: "loading",
        temp:"loading",
        humidity:"loading",
        desc:"loading",
        icon:"loading"
    })
    useEffect(()=>{
        getWeather()
    },[])
    const getWeather = async() => {
        let Mycity = await AsyncStorage.getItem("newcity")
        if(!Mycity){
            const {city} = props.route.params
            Mycity = city
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Mycity}&APPID=8c7128116e0debd65abd1f677e4e158d&units=metric`)
        .then(data => console.log(data))
        .then(result => {
            setInfo({
                name: result.name,
                temp: result.main.temp,
                humidity: result.main.humidity,
                desc: result.weather[0].description,
                icon : result.weather[0].icon,
            })
        })
        .catch(err => {
            alert(err.message)
        })
    }
    if(props.route.params.city != "hanoi"){
        getWeather()
    }
    return(
     
        <View style={{flex:1}}>
            <Header name="Weather App"></Header>
                <View style={{alignItems:"center"}}>
                <Title style={{
                    color:"#00aaff",
                    marginTop:30,
                    fontSize:30,
                }}>{info.name}

                </Title>
                <Image style={{width:120,height:120}} source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}}>

                </Image>
                </View>
            
            <Card style={{margin:5, padding:12}}>
                <Title style={{color:"#00aaff"}}>Temperature = {info.temp}</Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title style={{color:"#00aaff"}}>Humidity = {info.humidity}</Title>
            </Card>
            <Card style={{margin:5, padding:12}}>
                <Title style={{color:"#00aaff"}}>Description = {info.desc}</Title>
            </Card>

            

        </View>
    )
}
export default Home;