import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    Alert,
} from "react-native";

import { getUser } from "../../utils/authStorage";
import {
    getAddresses,
    deleteAddress,
} from "../../services/addressService";

export default function SavedAddressScreen() {

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        loadAddresses();
    }, []);

    async function loadAddresses() {
        try {

            const user = await getUser();

            if (!user) {
                return;
            }

            const data = await getAddresses(user.id);

            setAddresses(data);

        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete(id) {

        Alert.alert(
            "Delete Address",
            "Are you sure you want to delete this address?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {

                        try {

                            await deleteAddress(id);

                            loadAddresses();

                        } catch (error) {
                            console.log(error);
                        }

                    },
                },
            ]
        );

    }

    function renderItem({ item }) {

        return (

            <View
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 15,
                }}
            >

                <Text>{item.label}</Text>

                <Text>{item.addressLine}</Text>

                <Text>
                    {item.city}, {item.state}
                </Text>

                <Text>{item.pincode}</Text>

                <Text>{item.country}</Text>

                <Text>
                    Latitude : {item.latitude}
                </Text>

                <Text>
                    Longitude : {item.longitude}
                </Text>

                <Text>
                    Default :
                    {item.isDefault ? " Yes" : " No"}
                </Text>

                <View style={{ marginTop: 10 }} />

                <Button
                    title="Edit"
                    onPress={() =>
                        Alert.alert(
                            "Pending",
                            "AddressFormScreen will be integrated next."
                        )
                    }
                />

                <View style={{ height: 10 }} />

                <Button
                    title="Delete"
                    onPress={() => handleDelete(item.id)}
                />

            </View>

        );

    }

    return (

        <View
            style={{
                flex: 1,
                padding: 20,
                paddingTop: 50,
            }}
        >

            <Button
                title="Add Address"
                onPress={() =>
                    Alert.alert(
                        "Pending",
                        "AddressFormScreen will be integrated next."
                    )
                }
            />

            <View style={{ height: 20 }} />

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />

        </View>

    );

}
