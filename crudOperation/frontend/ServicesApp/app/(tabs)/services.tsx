import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import API from "../../src/api";

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [desccription, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await API.get("/services/");
            setServices(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addService = async () => {
        if (!name || !price) return;
        try {
            await API.post("/services/", { name, desccription, price });
            setName("");
            setDescription("");
            setPrice("");
            fetchServices();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Services</Text>

            <TextInput 
                style={styles.input}
                placeholder="Service Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                style={styles.input}
                placeholder="Description"
                value={desccription}
                onChangeText={setDescription}
            />
            <TextInput 
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
            />
            <Button title="Add Service" onPress={addService} />

            <FlatList 
                data={services}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.desccription}</Text>
                        <Text>R {item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#fff" 
    },
    title: { 
        fontSize: 22, 
        fontWeight: "bold",
        marginBottom: 10 
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        marginBottom: 10,
        borderRadius: 6,
    },
    card: {
        padding: 12,
        marginVertical: 6,
        backgroundColor: "#f9f9f9",
        borderRadius: 6,
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: "bold" 
    },
});