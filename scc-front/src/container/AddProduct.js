import "./css/addProduct.css"
import {useState} from "react";
import {createPayment} from "../requests";

export function AddProduct() {

    const [product, setProduct] = useState("");
    const [group, setGroup] = useState("");
    const [cost, setCost] = useState("");

    function create() {
        createPayment(product, cost, 1).then(r => console.log(r));
        setProduct("");
        setGroup("");
        setCost("");
    }

    return(
        <div className="add_product">
            <button className="add_product_button" onClick={create}>+</button>
            <input value={product} onChange={event => setProduct(event.target.value)} className="add_product__input"/>
            <input value={group} onChange={event => setGroup(event.target.value)} className="add_product__input"/>
            <input value={cost} onChange={event => setCost(event.target.value)} className="add_product__input"/>
        </div>
    )
}