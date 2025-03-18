import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";

const API_KEY = "sk-IOzOlv4WtMJltVUE0p6AyTmwkQmuGF23X4gp4QqutBq4T9NH"; // 🔥 Replace with your actual API Key
const API_URL = "https://api.stability.ai/v2beta/stable-image/generate/core";

export default function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImageUrl(null); // Clear previous image

    try {
      const formData = new FormData();
      formData.append("prompt", input);
      formData.append("style_preset", "enhance"); // Optional enhancement

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json", // Ensure API returns JSON
        },
        body: formData, // Send as multipart/form-data
      });

      const data = await response.json();
      // console.log("API Response:", data);

      if (data.image) {
        setImageUrl(`data:image/png;base64,${data.image}`);
      } else {
        alert("Error: No image generated.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error generating image.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Image Generator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a prompt..."
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={styles.button} onPress={generateImage} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Generating..." : "Generate Image"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});
