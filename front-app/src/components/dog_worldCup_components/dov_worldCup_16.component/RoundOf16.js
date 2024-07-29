import React, { useState, useEffect } from "react";

const items = [
    {
        name: "햄버거",
    },
    {
        name: "볶음밥",
    },
    {
        name: "파스타",
    },
    {
        name: "라면",
    }
];

const RoundOf16 = () => {
    const [foods, setFoods] = useState([]);
    const [displays, setDisplays] = useState([]);
    const [winners, setWinners] = useState([]);
    useEffect(() => {
        items.sort(() => Math.random() - 0.5);
        setFoods(items);
        setDisplays([items[0], items[1]]);
    }, []);

    const clickHandler = food => () => {
        if (foods.length <= 2) {
            if (winners.length === 0) {
                setDisplays([food]);
            } else {
                let updatedFood = [...winners, food];
                setFoods(updatedFood);
                setDisplays([updatedFood[0], updatedFood[1]]);
                setWinners([]);
            }
        } else if (foods.length > 2) {
            setWinners([...winners, food]);
            setDisplays([foods[2], foods[3]]);
            setFoods(foods.slice(2));
        }
    };
    return (
        <div>
            <h1 className="title">Favorite Worldcup</h1>
            {displays.map(d => {
                return (
                    <div className="flex-1" key={d.name} onClick={clickHandler(d)}>
                        <img className="food-img" src={d.src} />
                        <div className="name">{d.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default RoundOf16;