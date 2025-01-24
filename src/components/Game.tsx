"use client";

import { useEffect, useState } from "react";
import InfoItem from "./InfoItem";
import { GridItemType } from "@/types/GridItemType";
import { items } from "@/data/items";
import { GridItem } from "@/components/GridItem";
import { formatTime } from "@/utils/formatTime";

const Game = () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);
    const [moveCount, setMoveCount] = useState<number>(0);
    const [showCount, setShowCount] = useState<number>(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([]);

    useEffect(()=> {
        reset()
    },[])

    useEffect(()=> {
        const timer = setInterval(()=> {
            if(playing) {
                setTime(time + 1)
            }
        }, 1000);

        return () => clearInterval(timer)
    }, [playing, time]);

    useEffect(()=> {
        if(showCount === 2) {
            let opened = gridItems.filter(item => item.show === true);
            if(opened.length === 2 ) { // se tem 2 mostrando

                
                // se eles são iguais, os que tiverem show, devem ser permanentes
                if(opened[0].item === opened[1].item) {
                    let tmpGrid = [...gridItems];
                    for(let i in tmpGrid) {
                        if(tmpGrid[i].show) {
                            tmpGrid[i].permanentShow = true;
                            tmpGrid[i].show = false
                        }
                    }
                    setGridItems(tmpGrid);
                    setShowCount(0);
                } else { // se eles não são iguais, devem "desvirar"
                    setTimeout(()=> {
                        let tmpGrid = [...gridItems];
                        for(let i in tmpGrid) {
                            if(tmpGrid[i].show) {
                                tmpGrid[i].show = false
                            }
                        }
                        setGridItems(tmpGrid);
                        setShowCount(0);
                    }, 1500)
                }

                setMoveCount(moveCount => moveCount + 1)
            }
        }
    },[showCount, gridItems])

    const reset = () => {
        setTime(0);
        setMoveCount(0);
        setShowCount(0);

        let tmpGrid: GridItemType[] = []
        for(let i =0; i<(items.length * 2); i++) {
            tmpGrid.push({
                item: null,
                show: false,
                permanentShow:false
            })
        }
        for(let w=0; w < 2; w++) {
            for(let i= 0; i< items.length; i++)  {
                let position = - 1;
                while(position < 0 || tmpGrid[position].item !== null) {
                    position = Math.floor(Math.random() * (items.length *2));
                }
                tmpGrid[position].item = i;
            }
        }
        // jogar no state
        setGridItems(tmpGrid);
        // começar o jogo
        setPlaying(true);
    }

    useEffect(()=> {
        if(moveCount > 0 && gridItems.every(item => item.permanentShow === true)) {
            setPlaying(false);
        }

    }, [moveCount, gridItems]);

    const handleClick = (index:number) => {
        if(playing && index !== null && showCount < 2)  {
            
            let tmpGrid = [...gridItems];

            if(tmpGrid[index].permanentShow === false && tmpGrid[index].show === false) {
                tmpGrid[index].show = true;
                setShowCount(showCount + 1);
            }
            setGridItems(tmpGrid);
        }
    }   

    return (
        <div className="container flex flex-col gap-4 md:flex-row py-12 px-2 m-auto">
			<div className="flex flex-col w-auto mb-4 items-center md:mb-0 md:items-start">
				<div>
					<img src={'/assets/devmemory_logo.png'} alt="" className="w-52" />
				</div>
				<div className="w-full my-2 flex justify-around text-center md:block md:justify-start md:text-start">
                    <InfoItem label="Tempo" value={formatTime(time)}/>
                    <InfoItem label="Jogadas" value={moveCount.toString()}/>
				</div>
                <button type="button" title="restart" className="flex gap-2 p-2 justify-center items-center w-52 bg-blue-700 rounded-md cursor-pointer opacity-100 transition-all ease-linear duration-100 hover:opacity-80 text-white" onClick={reset}>
                    <div className="flex justify-center items-center border-r border-r-gray-50/20 p-2">
                        <img src="/svgs/restart.svg" alt="" className="w-4 "/>
                    </div>
                    <p className="text-white fex justify-center items-center flex-1 px-5">Restart</p>
                </button>
			</div>
			<div className="flex-1 flex justify-center  md:justify-end ">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full max-w-2xl">
                    {gridItems.map((item, index)=> (
                        <GridItem key={index} item={item} onClick={()=> {
                            handleClick(index)
                        }}/>
                    ))}
                </div>
			</div>
		</div>
    )
}
export default Game;