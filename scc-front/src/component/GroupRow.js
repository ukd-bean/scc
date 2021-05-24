import './css/row.css'
import {useEffect, useState} from "react";
import {PaymentRow} from "./PaymentRow";
import {calcPaymentsSum} from "../util/utils";
import { createGroup } from "../requests";

export function GroupRow({group, parentId}) {

    const [expanded, setExpanded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [children, setChildren] = useState("");
    const [payments, setPayments] = useState("");
    const [commonSum, setCommonSum] = useState(0);

    useEffect(() => {
        if (!group.isNew) {
            setId(group.id)
            setName(group.name)
            setChildren(group.children)
            setPayments(group.payments)
            setCommonSum(calcPaymentsSum(group).toFixed(2));
        } else {
            setId(0)
            setName('');
            setChildren([])
            setPayments([])
            setIsEdit(true);
        }
    }, [group])

    function expand(e) {
        if ((e.target.getAttribute("data-key") === id.toString()
            || e.target.parentNode.getAttribute("data-key") === id.toString()
            || e.target.parentNode.parentNode.getAttribute("data-key") === id.toString())
             && e.target.className !== 'row_edit') {
                e.preventDefault();
                setExpanded(!expanded);
        }
    }

    function onEdit(e) {
        e.stopPropagation();
        setIsEdit(!isEdit)
    }

    function applyEdit(e) {
        e.stopPropagation();
        createGroup(name, parentId);
        setIsEdit(!isEdit)
    }

    function onRemove(e) {
        e.stopPropagation();
        alert("Are you stupid!?!?");
    }

    function onNewGroup(e) {
        e.stopPropagation();
        if (!expanded) {
            setExpanded(true);
        }
        const childrenCopy = [...children];
        childrenCopy.push({isNew: true, id: 0});
        setChildren(childrenCopy);
    }

    function onNewPayment(e) {
        e.stopPropagation();
        if (!expanded) {
            setExpanded(true);
        }
    }

    function refresh() {
        const newChildren = 
    }

    return(
        <div>
            <div key={id} data-key={id} className="row"
                 onClick={(e) => expand(e)}
            >
                <div className="row_info">
                    &#128193;
                    {isEdit ?
                        <input className="row_edit" value={name} onChange={(e) => setName(e.target.value)} />
                        :
                        <div className="row__section short">{name}</div>
                    }
                    <div className="row__section-cost">{commonSum}</div>
                </div>
                <div className="row_actions">
                    {isEdit ? 
                        <div id="row_edit-apply" className="row_action new" onClick={(e) => applyEdit(e)}>
                            &#10004;
                        </div>
                    : 
                        <>
                            <div id="row_new-group" className="row_action new" onClick={(e) => onNewGroup(e)}>
                                &#128193;
                            </div>
                            <div id="row_new-pay" className="row_action new" onClick={(e) => onNewPayment(e)}>
                                &#128178;
                            </div>
                            <div id="row_edit" className="row_action small" onClick={(e) => onEdit(e)}>
                                &#128295;
                            </div>
                            <div id="row_delete" className="row_action small" onClick={(e) => onRemove(e)}>
                                &#10060;
                            </div>
                        </>
                    }    
                </div>
            </div>
            <div className="row__expand-zone">
                {expanded ? children.map(child => <GroupRow key={child.id} group={child} parentId={group.id} refreshParent={() => refresh()}/>) : ""}
                {expanded ? payments.map(payment => <PaymentRow key={payment.id} payment={payment}/>) : ""}
            </div>
        </div>
    )

}