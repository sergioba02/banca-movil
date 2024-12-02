import { StyleSheet, View, TouchableOpacity, Text, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native"


export default function HomeScreen({ navigation }) {


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={-220}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.label}>Depositar a mi cuenta</Text>
                    </View>
                    <View style={styles.inputt}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Cantidad'}
                            placeholderTextColor='#747474'
                            keyboardType="numeric"
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.btnAdd}
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#218DD4',
    },
    inputt: {
        marginBottom: Platform.select({
            android: 0,
            ios: 0,

        }),
    },
    input: {
        height: 40,
        width: 264,
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
        marginBottom: 0,

    },
    btnAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        width: 128,
        height: 40,
        borderRadius: 100,
        marginTop: 0,

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
        width: 128,
        height: 40,
        borderRadius: 100,
        marginTop: 0,
        marginBottom: 1000,

    },
    textClose: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: "inter",
        fontWeight: "bold"
    
    },
});