import "./css/productsHeader.css"
import {ProductRow} from "../component/ProductRow";
import {AddProduct} from "./AddProduct";

export function ProductsHeader() {

    return(
        <div className="column_names">
            <ProductRow product={{name: "Name", parent: "Group", cost: "Cost"}} noCheckbox={true}/>
            <AddProduct/>
        </div>
    )
}