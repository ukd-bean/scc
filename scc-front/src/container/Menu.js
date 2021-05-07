import "./css/menu.css"
import {createGroup, createPayment, getAllGroups, getFilledPaymentGroups} from "../requests";

export function Menu() {

    function allGroups() {
        getAllGroups().then(r => console.log(r));
    }

    function createNewGroup() {
        createGroup("group-name").then(r => console.log(r));
    }

    function allPayments() {
        getFilledPaymentGroups().then(r => console.log(r));
    }

    function createNewPayment() {
        createPayment("payment-name", 1000, 1).then(r => console.log(r));
    }

    return (
        <div className="menu">
            <button className="menu__button" onClick={() => allGroups()}>
                all groups
            </button>
            <button className="menu__button" onClick={() => createNewGroup()}>
                create group
            </button>
            <button className="menu__button" onClick={() => allPayments()}>
                all payments
            </button>
            <button className="menu__button" onClick={() => createNewPayment()}>
                create payment
            </button>
        </div>
    )
}