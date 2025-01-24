import { GridItemType } from "@/types/GridItemType";
import { items } from "@/data/items";
import { useEffect, useState } from "react";

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}: Props) => {
    const [showBackground, setShowBackground] = useState<boolean>(false);

    useEffect(()=> {
        setShowBackground(item.permanentShow || item.show)
    },[item.show, item.permanentShow])

    return (
        <div 
            onClick={onClick} 
            className={`${showBackground ? 'bg-blue-700' : 'bg-gray-400'} h-24 rounded-3xl flex justify-center items-center cursor-pointer`}
        >
            {item.permanentShow === false && item.show === false && 
                <img src="/svgs/b7.svg" alt="b7" className="w-10 h-10 opacity-10"/>
            }
            {(item.permanentShow || item.show) && item.item !== null &&
                <img src={items[item.item].icon}  alt="" className="w-10 h-10"/>
            }
        </div>
    )
}