import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  var [temperature, setTemparature] = useState(0);
  var [pressure, setPressure] = useState(0);
  var [Humidity, setHumidity] = useState(0);
  var [ldr, setLdr] = useState(0);
  var [air_quality, setair_quality] = useState(0);
  var [soil_moisture, setSoil_moisture] = useState(0);
  var [pir, setPir] = useState(0);

  const Item = ({ title, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{id}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const DATA = [
    {
      id: "Temperature",
      title: temperature,
    },
    {
      id: "Pressure",
      title: pressure,
    },
    {
      id: "Humidity",
      title: Humidity,
    },
    {
      id: "LDR",
      title: ldr,
    },
    {
      id: "Air Quality",
      title: air_quality,
    },
    {
      id: "Soil moisture",
      title: soil_moisture,
    },
    {
      id: "PIR",
      title: pir,
    },
  ];

  useEffect(() => {
    setInterval(async () => {
      const response = await fetch("http://htsingh.pythonanywhere.com/");
      const mytext = await response.json();
      const a = await Object.values(mytext);

      setair_quality(a[0]);
      setHumidity(a[1]);
      setLdr(a[2]);
      setPir(a[3]);
      setPressure(a[4]);
      setSoil_moisture(a[5]);
      setTemparature(a[6]);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#ffffff",
          fontSize: 30,
          marginBottom: 20,
          marginTop: 30,
        }}
      >
        Agriculture data
      </Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1e24",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: { height: "40%" },
  item: {
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
  value: {
    fontSize: 20,
    color: "#ffffff",
  },
  btn: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    width: "30%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
});
