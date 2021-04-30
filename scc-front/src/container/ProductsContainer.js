import "./css/products.css";
import {getAllPayments} from "../requests";
import {ProductRow} from "../component/ProductRow";
import {useEffect, useState} from "react";
import {ProductsHeader} from "./ProductsHeader";

export function ProductsContainer() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        getAllPayments().then(items => setPayments(items));
    })

    return (
        <div className="container">
            <ProductsHeader/>
            {payments.map((payment, index) => <ProductRow key={index} product={payment}/>)}
        </div>
    )
}