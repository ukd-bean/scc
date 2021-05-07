import "./css/productsHeader.css"
import {PaymentRow} from "../component/PaymentRow";
import {AddProduct} from "./AddProduct";

export function PaymentsHeader({commonSum}) {

    return(
        <div>{commonSum}</div>
        // <div className="column_names">
        //     <PaymentRow payment={{name: "Name", parent: "Group", cost: "Cost"}} noCheckbox={true}/>
        //     <AddProduct/>
        // </div>
    )
}