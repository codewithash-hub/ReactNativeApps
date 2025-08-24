import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import API from "../../src/api";

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
      await API.post("/services/", { name, description, price });
      setName("");
      setDescription("");
      setPrice("");
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  const renderService = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
      <Text style={styles.cardPrice}>R {item.price}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Available Services</Text>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Service Name"
          placeholderTextColor="#5B2333"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#5B2333"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          placeholderTextColor="#5B2333"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.button} onPress={addService}>
          <Text style={styles.buttonText}>+ Add Service</Text>
        </TouchableOpacity>
      </View>

      {/* Services list */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderService}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#5B2333",
  },
  form: {
    marginBottom: 20,
    backgroundColor: "#f7f0eeff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fafafaff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5B2333",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#F7f4f3",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f7f0eeff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5B2333",
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cardPrice: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#5B2333",
  },
});
