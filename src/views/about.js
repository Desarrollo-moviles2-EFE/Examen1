import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from "../style/styleabout";


import EstebanPhoto from '../img/Esteban.png';
//import Member2Photo from '../img/Member2.png';
//import Member3Photo from '../img/Member3.png';

const AboutScreen = () => {
  const groupName = 'G-Force';

  const members = [
    {
      name: 'Esteban Porras Villalobos',
      photo: EstebanPhoto, // Imagen local
      info: 'Estudiante de Ingieneria en Tecnologias de Información(ITI) En la Universidad Tecnica Nacional, tengo 20 años y vivo en Macacona/Esparza.',
    },
    {
      name: 'Eliacid Castillo Rojas',
      photo: 'https://via.placeholder.com/150', // Imagen local
      info: 'Estudiante de Ingieneria en Tecnologias de Información(ITI) En la Universidad Tecnica Nacional.',
    },
    {
      name: 'Francinie Rodriguez Lanuza',
      photo: 'https://via.placeholder.com/150', // Imagen local
      info: 'Estudiante de Ingieneria en Tecnologias de Información(ITI) En la Universidad Tecnica Nacional.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{groupName}</Text>
      {members.map((member, index) => (
        <View key={index} style={styles.memberContainer}>
          <Image source={member.photo} style={styles.photo} />
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberInfo}>{member.info}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AboutScreen;
