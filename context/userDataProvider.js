import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState([]);
    const [dataToList, setDataToList] = useState([]);

    const ipComputadora = "192.168.1.67";

    useEffect(() => {
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
                        id: tempID,
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

        }
        fetchInOrder();
    }, []);

    return (
        <UserContext.Provider value={{userData, dataToList}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);
