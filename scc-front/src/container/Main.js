import './css/main.css';
import {PaymentsContainer} from "./PaymentsContainer";
import {ContextMenu} from "../component/ContextMenu";


export function Main() {

    return (
        <div className="main">
            <PaymentsContainer/>
            <ContextMenu />
        </div>
    )
}