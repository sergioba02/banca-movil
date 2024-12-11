import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState([]);
    const [dataToList, setDataToList] = useState([]);
    const [codesToList, setCodesToList] = useState([]);

    const ipComputadora = "192.168.1.70";

    const fetchUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación');
                return;
            }

            const response = await fetch(`http://${ipComputadora}:3000/user/data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                const jsonData = await response.json();
                setUserData(jsonData.data[0]);
                return jsonData.data[0];
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
            console.error(error);
        }
    };

    const fetchUserTransactions = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación');
                return;
            }

            const response = await fetch(`http://${ipComputadora}:3000/user/transactions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                const ids = [];
                const jsonData = await response.json();

                jsonData.data.forEach((transaction) => {
                    if (transaction.user_orig_id !== userData.id && !ids.includes(transaction.user_orig_id)) {
                        ids.push(transaction.user_orig_id);
                    }
                    if (transaction.user_dest_id !== userData.id && !ids.includes(transaction.user_dest_id)) {
                        ids.push(transaction.user_dest_id);
                    }
                })
                console.log(ids)
                return { ids: ids, transactions: jsonData.data };
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
            console.error(error);
        }
    };

    const fetchUsersNames = async (ids) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación');
                return;
            }

            const queryString = ids.map(id => `id=${id}`).join('&');

            const response = await fetch(`http://${ipComputadora}:3000/users/names?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const jsonData = await response.json();
                return jsonData.data;

            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
            console.error(error);
        }
    };

    const fetchCodes = async () => {

        const tempCodeList = [];

        try {
            setCodesToList([]);
            
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación');
                return;
            }

            const response = await fetch(`http://${ipComputadora}:3000/user/qrcodes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const jsonData = await response.json();
                console.log('codesToList provider: ',jsonData.data);

                jsonData.data.forEach(item => {
                    tempCodeList.push({
                        id: item.id,
                        code: item.code,
                        amount: JSON.parse(item.data).amount,
                        concept: JSON.parse(item.data).concept,
                        date: item.date.slice(0,10),
                        
                    })
                })
                setCodesToList(tempCodeList);
                return;

            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
            console.error(error);
        }
    };

    const fetchInOrder = async () => {

        try {
            setDataToList('');
            const userDataa = await fetchUserData();
            const { ids, transactions } = await fetchUserTransactions();
            const usersNames = await fetchUsersNames(ids);

            const tempDataToList = [];

            for (const transaction of transactions) {
                console.log(transaction)
                let tempID;
                let tempUser;
                let tempType;


                if (transaction.user_orig_id !== userDataa.id) {
                    tempID = transaction.user_orig_id;
                    tempUser = usersNames.find(user => user.id == tempID);
                    tempType = 'income';
                } else {
                    tempID = transaction.user_dest_id;
                    tempUser = usersNames.find(user => user.id == tempID);
                    tempType = 'payment';
                }
                tempDataToList.push({
                    id: uuid.v4(),
                    name: `${tempUser.name} ${tempUser.surname}`,
                    amount: transaction.amount,
                    date: transaction.date.slice(0, 10),
                    status: 'Completado',
                    type: tempType,
                });
            }

            setDataToList(tempDataToList)

        } catch (error) {
            console.error('Error en alguna de las peticiones:', error);
        }

    };

    return (
        <UserContext.Provider value={{ 
            userData, 
            dataToList, 
            setDataToList, 
            fetchUserData, 
            fetchInOrder, 
            fetchCodes, 
            codesToList, 
             }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
