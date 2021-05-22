import './css/row.css'
import {useEffect, useState} from "react";
import {PaymentRow} from "./PaymentRow";
import {calcPaymentsSum} from "../util/utils";

export function GroupRow({group}) {

    const [expanded, setExpanded] = useState(false);
    const [commonSum, setCommonSum] = useState(0);

    useEffect(() => {
        setCommonSum(calcPaymentsSum(group).toFixed(2));
    }, [])

    function expand(e) {
        if (e.target.getAttribute("data-key") == group.id
            || e.target.parentNode.getAttribute("data-key") == group.id
            || e.target.parentNode.parentNode.getAttribute("data-key") == group.id) {
                e.preventDefault();
                setExpanded(!expanded);
        }
    }

    return(
        <div>
            <div key={group.id} data-key={group.id} className="row"
                 onClick={(e) => expand(e)}
            >
                <div className="row_info">
                    &#128193;
                    <div className="row__section short">{group.name}</div>
                    <div className="row__section-cost">{commonSum}</div>
                </div>
                <div className="row_actions">
                    <div id="row_edit" className="row_action">
                        &#128394;
                    </div>
                    <div id="row_delete" className="row_action">
                        &#128465;
                    </div>
                </div>
            </div>
            <div className="row__expand-zone">
                {expanded ? group.children.map(child => <GroupRow key={child.id} group={child}/>) : ""}
                {expanded ? group.payments.map(payment => <PaymentRow key={payment.id} payment={payment}/>) : ""}
            </div>
        </div>
    )

}