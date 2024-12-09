import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Alert } from 'react-native';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState([]);
    const [dataToList, setDataToList] = useState([]);

    const ipComputadora = "192.168.1.67";

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

            const response = await fetch(`http://${ipComputadora}:3000/user/lastTransactions`, {
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

    const fetchAllUserTransactions = async () => {
        try {
            const ids = [];
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                Alert.alert('Error', 'No se encontró el token de autenticación');
                return;
            }

            const response = await fetch(`http://${ipComputadora}:3000/user/allTransactions`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {

                const jsonData = await response.json();

                jsonData.data.forEach((transaction) => {
                    if (transaction.user_orig_id !== jsonData.id && !ids.includes(transaction.user_orig_id)) {
                        ids.push(transaction.user_orig_id);
                    }
                    if (transaction.user_dest_id !== jsonData.id && !ids.includes(transaction.user_dest_id)) {
                        ids.push(transaction.user_dest_id);
                    }
                })
                console.log(ids)
                return { ids: ids, userID: jsonData.id, transactions: jsonData.data };
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

    const fetchInOrder = async () => {
        
        try {
            setDataToList([]);
            const userDataa = await fetchUserData();
            const { ids, transactions } = await fetchUserTransactions();
            const usersNames = await fetchUsersNames(ids);

            const tempDataToList = [...dataToList];

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
                    status: 'default',
                    type: tempType,
                });
            }

            setDataToList(tempDataToList)

        } catch (error) {
            console.error('Error en alguna de las peticiones:', error);
        }

    };

    const historyFetchInOrder = async () => {
        
        try {
            setDataToList([]);
            const { ids, userID, transactions } = await fetchAllUserTransactions();
            const usersNames = await fetchUsersNames(ids);

            console.log('Id del usuario: ', userID)

            const tempDataToList = [...dataToList];

            for (const transaction of transactions) {
                let tempID;
                let tempUser;
                let tempType;

                if (transaction.user_orig_id !== userID) {
                    tempID = transaction.user_orig_id;
                    tempUser = usersNames.find(user => user.id == tempID);
                    console.log('datos del usuario encontrado en origen: ', tempUser)
                    tempType = 'income';
                } else {
                    tempID = transaction.user_dest_id;
                    tempUser = usersNames.find(user => user.id == tempID);
                    console.log('datos del usuario encontrado en destino: ', tempUser)
                    tempType = 'payment';
                }
                console.log('datos del usuario encontrado: ', tempUser)
                tempDataToList.push({
                    id: uuid.v4(),
                    name: `${tempUser.name} ${tempUser.surname}`,
                    amount: transaction.amount,
                    date: transaction.date.slice(0, 10),
                    status: 'default',
                    type: tempType,
                });
            }
            console.log('datos de tempDataToList: ',tempDataToList)

            setDataToList(tempDataToList)

        } catch (error) {
            console.error('Error en alguna de las peticiones:', error);
        }

    }

    return (
        <UserContext.Provider value={{userData, dataToList, setDataToList, fetchUserData, fetchInOrder, historyFetchInOrder}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
