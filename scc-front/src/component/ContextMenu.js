import { useEffect, useRef, useState } from "react";

export function ContextMenu() {

    const [isShown, setIsShown] = useState(false);
    const [coordinated, setCoordinates] = useState({x: null, y: null});

    useEffect(() => {
        document.addEventListener("contextmenu", (e) => processContextClick(e))
    }, []);

    function processContextClick(e) {
        if (e?.target?.classList?.contains("row") || e?.target?.parentNode?.classList?.contains("row")) {

            const x = e.pageX;
            const y = e.pageY;

            console.log("popal")
            // e.preventDefault();
        } else {
            console.log("NE popal")
        }
    }

    return (
        <div className={`context-menu ${isShown ? " " : "hidden"}`} >
            <div className="menu-row">редактировать</div>
            <div className="menu-row">удалить</div>
        </div>
    )
}