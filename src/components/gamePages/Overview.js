import { useState, useEffect } from "react"

import Dice from "./Dice";
import GameHeader from "./GameHeader";
import GameHome from "./GameHome";
import Property from "./Property";
import Card from "./Card";
import io from "socket.io-client";
import GameEnd from "./GameEnd";

let socket;
export default function Overview({pos1, pos2, pos3, pos4, showCard, payPlayer, payProperty, payTaxes, playerDone, soldProperty, buyProperty, propertyStatus, price, owner, propertyState, showScreen, rolledNumber, showDice, playerAmount, playerData, room, number, money, color, position, thrower, properties}){
    const CONNECTION_PORT = "https://passionproject-server.herokuapp.com/"
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

    useEffect(()=>{
        socket.emit('create_room', room); 
    },[])
    
    const setRolledNumber = (val) =>{
        rolledNumber(val);
    }

    const [positions, setpositions] = useState({
    "pos1": "Start",
    "pos2": "Start",
    "pos3": "Start",
    "pos4": "Start"
    });

    useEffect(()=>{
        socket.on('user_left', ()=>{
            // console.log('user left');
            window.location.reload();
        })

        socket.on('end_game', ()=>{
            setgameEnd(true);
        })

        socket.on('receive_positiondata', (positions)=>{
            // console.log(positions)
            for (let key in positions) {
            // console.log(positions[key]);
            switch (positions[key]) {
                case 'start':
                    positions[key] = 'Start';
                    break;
                case '1':
                    positions[key] = 'Pull-up';
                    break;
                case 'kaartje1':
                    positions[key] = 'Card';
                    break;
                case '2':
                    positions[key] = 'Preacher curl';
                    break;
                case '3':
                    positions[key] = 'Push-up';
                    break;
                case 'station1':
                    positions[key] = 'Oxygen';
                    break;
                case 'belastingen1':
                    positions[key] = 'Taxes';
                    break;
                case '4':
                    positions[key] = 'Landmine row';
                    break;
                case '5':
                    positions[key] = 'Bent over row';
                    break;
                case 'gevangenis':
                    positions[key] = 'Jail';
                    break;
                case '6':
                    positions[key] = 'Benchpress';
                    break;
                case '7':
                    positions[key] = 'Squat';
                    break;
                case 'kaartje2':
                    positions[key] = 'Card';
                    break;
                case '8':
                    positions[key] = 'Deadlift';
                    break;
                case 'rust':
                    positions[key] = 'Rest';
                    break;
                case '9':
                    positions[key] = 'Lateral raise';
                    break;
                case '10':
                    positions[key] = 'Shoulder press';
                    break;
                case 'kaartje3':
                    positions[key] = 'Card';
                    break;
                case '11':
                    positions[key] = 'Upright row';
                    break;
                case 'station2':
                    positions[key] = 'Basic-Fit';
                    break;
                case '12':
                    positions[key] = 'Hammer curl';
                    break;
                case 'belastingen2':
                    positions[key] = 'Taxes';
                    break;
                case '13':
                    positions[key] = 'Reverse curl';
                    break;
                case 'naar_gevang':
                    positions[key] = 'To jail';
                    break;
                case '14':
                    positions[key] = 'Cable flyes';
                    break;
                case '15':
                    positions[key] = 'Cable kickback';
                    break;
                case 'kaartje4':
                    positions[key] = 'Card';
                    break;
                case '16':
                    positions[key] = 'Rope pulldown';
                    break;
                default:
                    break;
            }
        }
            setpositions(positions);
        })
    })

    const [gameEnd, setgameEnd] = useState(false);
    
    return (
        <div>
            {!gameEnd ? 
            <div>
                <GameHeader money={money} number={number} color={color} room={room}/>
                {     
                showScreen ? <Property payPlayer={payPlayer} payProperty={payProperty} payTaxes={payTaxes} playerDone={playerDone} soldProperty={soldProperty} buyProperty={buyProperty} propertyStatus={propertyStatus} price={price} owner={owner} propertyState={propertyState}/> : 
                showDice ? <Dice rolledNumber={(val)=>setRolledNumber(val)} room={room}/> :
                <GameHome positions={positions} playerAmount={playerAmount} playerData={playerData} thrower={thrower} money={money} color={color} number={number} properties={properties}/>
                }
            </div> 
            :
            <GameEnd playerAmount={playerAmount} playerData={playerData}/>}
        </div> 
    )
}