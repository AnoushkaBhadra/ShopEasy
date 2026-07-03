import React from "react";
import { Text, StyleSheet } from "react-native";
import TYPOGRAPHY from "../../theme/typography";
import { COLORS } from "../../theme/colors";

export default function Price({value, style, currency = "₹"}){
    const formattedPrice = new Intl.NumberFormat("en-IN").format(value);

    return(
        <Text style = {styles.price}>{currency} {formattedPrice}</Text>
    )
}

const styles = StyleSheet.create({
    price: {
        color: COLORS.primary, 
        ...TYPOGRAPHY.price
    }
})