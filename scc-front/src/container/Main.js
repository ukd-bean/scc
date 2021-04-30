import './css/main.css';
import {ProductsContainer} from "./ProductsContainer";
import {Menu} from "./Menu";

export function Main() {

    return (
        <div className="main">
            <Menu/>
            <ProductsContainer/>
        </div>
    )
}