import "./css/products.css";
import {getFilledPaymentGroups} from "../requests";
import {useEffect, useState} from "react";
import {GroupRow} from "../component/GroupRow";
import {PaymentsHeader} from "./PaymentsHeader";
import {calcPaymentsSum} from "../util/utils";

export function PaymentsContainer() {

    const [groups, setGroups] = useState([]);
    const [commonSum, setCommonSum] = useState(0);

    useEffect(() => {
        getFilledPaymentGroups().then(items => {
            setGroups(items);
            let groupsSum = items.reduce((common, group) => {return common + calcPaymentsSum(group)}, 0)
            setCommonSum(groupsSum.toFixed(2));
        });
    }, [])

    return (
        <div className="container">
            <PaymentsHeader commonSum={commonSum}/>
            {groups.map((group, index) => <GroupRow key={index} group={group}/>)}
        </div>
    )
}