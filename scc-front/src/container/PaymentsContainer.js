import "./css/products.css";
import { getFilledPaymentGroups } from "../requests";
import { useEffect, useState } from "react";
import { GroupRow } from "../component/GroupRow";
import { PaymentsHeader } from "./PaymentsHeader";
import { calcPaymentsSum } from "../util/utils";

export function PaymentsContainer() {

	const [date, setDate] = useState(Date.now());
	const [commonSum, setCommonSum] = useState(0);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		refreshRoot();
	}, [])

	function refreshRoot(newDate) {
		getFilledPaymentGroups(newDate ? newDate : date).then(items => {
			let groupsSum = 0;
			setGroups(items);
			if (items) {
				groupsSum += items.reduce((common, group) => { return common + calcPaymentsSum(group) }, 0);
			}
			setCommonSum(groupsSum.toFixed(2));
		});
	}

	function changeMonth(monthOffset) {
		const dateT = new Date(date);
		let newDate;
		if (monthOffset > 0) {
			if (dateT.getMonth() == 11) {
				newDate = new Date(dateT.getFullYear() + 1, 0, 1);
				setDate(newDate.getTime());
			} else {
				newDate = new Date(dateT.getFullYear(), dateT.getMonth() + 1, 1);
				setDate(newDate.getTime());
			}
		} else {
			if (dateT.getMonth() == 0) {
				newDate = new Date(dateT.getFullYear() - 1, 0, 1);
				setDate(newDate.getTime());
			} else {
				newDate = new Date(dateT.getFullYear(), dateT.getMonth() - 1, 1);
				setDate(newDate.getTime());
			}
		}
		refreshRoot(newDate.getTime());
	}

	function onNewGroup(e) {
		e.stopPropagation();
		const groupsCopy = [...groups];
		groupsCopy.push({ isNew: true, id: 0 });
		setGroups(groupsCopy);
	  }
	
	//   function onNewPayment(e) {
	// 	e.stopPropagation();
	// 	if (!expanded) {
	// 	  setExpanded(true);
	// 	}
	// 	const paymentsCopy = [...payments];
	// 	paymentsCopy.push({ isNew: true, id: 0, groupId: id });
	// 	setPayments(paymentsCopy);
	//   }

	return (
		<div className="container">
			<PaymentsHeader
				commonSum={commonSum}
				date={date}
				changeMonth={(offset) => changeMonth(offset)}
				newGroup={(e) => onNewGroup(e)}
			/>

			{groups ? groups.map((group, index) => <GroupRow key={group.id} group={group} refreshParent={() => refreshRoot()} />) : ''}
		</div>
	)
}