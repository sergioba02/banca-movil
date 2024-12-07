import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native"
import { useUserData } from "../context/userDataProvider";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {

    const { userData } = useUserData();
    const [amount, setAmount] = useState();
    const newAmount = parseInt(amount) + parseInt(userData.balance);

    const ipComputadora = "192.168.1.67";

    const handleAddBalance = async () => {
        try {
            if (isNaN(newAmount) || newAmount <= 0) {
                Alert.alert('Error', 'La cantidad no es válida');
                return;
            }

            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación');
                return;
            }
            const response = await fetch(`http://${ipComputadora}:3000/user/addBalance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: parseInt(newAmount),
                }),
            });

            if (response.status === 200) {
                setAmount('');
                Alert.alert('Depósito exitoso', 'Disfrute de su nuevo saldo', [
                    { text: 'Aceptar', onPress: () => { navigation.replace("HomeScreen"); } },
                ]);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
            console.error(error);
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.labelsContainer}>
                    <Text style={styles.label}>Cuenta: {userData.num_account}</Text>
                    <Text style={styles.label}>Depositar a mi cuenta</Text>
                </View>
                <View style={styles.inputt}>
                    <TextInput
                        style={styles.input}
                        placeholder={'$0.00'}
                        placeholderTextColor='#747474'
                        keyboardType="numeric"
                        maxLength={8}
                        onChangeText={setAmount}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => {
                            console.log('amount:', newAmount)
                            handleAddBalance()
                        }}
                    >
                        <Text style={styles.textAdd}>Agregar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => navigation.navigate("HomeScreen")}
                    >
                        <Text style={styles.textClose}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#218DD4',
    },
    labelsContainer: {
        alignItems: 'flex-start',
        marginTop: 100,
        width: 362,
    },
    inputt: {
        marginBottom: Platform.select({
            android: 0,
            ios: 25,

        }),
    },
    input: {
        height: 40,
        width: 362,
        padding: 10,
        borderRadius: 14,
        fontSize: 18,
        fontFamily: "inter",
        fontStyle: "italic",
        fontWeight: "medium",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        borderColor: '#D1D1D1',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
    },
    header: {
        height: 'auto',
        width: 'auto',
        marginTop: 0,
    },
    label: {
        fontFamily: "inter",
        fontSize: 24,
        fontWeight: "bold",
        color: 'black',
        color: '#FFFFFF',
        marginTop: 0,
        marginBottom: 20,

    },
    btnAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        width: 362,
        height: 40,
        borderRadius: 100,
        marginBottom: 520,

    },
    textAdd: {
        fontSize: 20,
        color: '#000',
        opacity: 0.6,
        fontFamily: "inter",
        fontWeight: "bold"
    },
    btnClose: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DADE2',
        borderWidth: 3,
        borderColor: '#5DADE2',
        width: 362,
        height: 40,
        borderRadius: 100,
        marginTop: 0,
        marginBottom: 0,

    },
    textClose: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: "inter",
        fontWeight: "bold"

    },
});