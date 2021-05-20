// import { useEffect, useRef, useState } from "react";

// export function ContextMenu() {

//     const menu = useRef(null);

//     const [isShown, setIsShown] = useState(false);
//     const [coordinated, setCoordinates] = useState(null);

//     useEffect(() => {
//         document.addEventListener("contextmenu", (e) => processContextClick(e))
//     }, []);

//     function processContextClick(e) {
//         if (e?.target?.classList?.contains("row") || e?.target?.parentNode?.classList?.contains("row")) {
//             e.preventDefault();
//             const x = e.pageX;
//             const y = e.pageY;

//             menu.current.style.top = y;
//             menu.current.style.left = x;

//             console.log(!isShown);
//             setIsShown(!isShown);
//         } else {
//             console.log("XUY")
//             console.log(e?.target?.classList);
//             setIsShown(false);
//             e.preventDefault();
//         }
//     }

//     return (
//         <div className={`context-menu ${isShown ? " " : "hidden"}`} ref={menu}>
//             <div className="menu-row">редактировать</div>
//             <div className="menu-row">удалить</div>
//         </div>
//     )
// }