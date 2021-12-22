import QRCode from "./QRCodePage";
import QRCamera from "./QRCamera";
import { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import mascotte_homepage from "../assets/mascotte_homepage.svg"
import BoardInterface from "./BoardInterface";

import mc from "../assets/_money-confetti.json";
import Lottie from 'react-lottie';

import MultiPlayer from "./Multiplayer";
import mixkitplayerlosingorfailing2042 from "../assets/Sounds/mixkit-unlock-new-item-game-notification-254.wav";

import CardDone from "../assets/Sounds/mixkit-winning-a-coin-video-game-2069.wav";
import EndGame from "../assets/Sounds/mixkit-completion-of-a-level-2063.wav";
import PlayerReceivesMoney from "../assets/Sounds/mixkit-winning-an-extra-bonus-2060.wav";
import PlayerPaysMoney from "../assets/Sounds/mixkit-unlock-new-item-game-notification-254.wav";
import PlayerJoins from "../assets/Sounds/mixkit-arcade-retro-changing-tab-206.wav";
import SoldProperty from "../assets/Sounds/mixkit-player-losing-or-failing-2042.wav";
import ComesMoney from "../assets/Sounds/Here-comes-the-money.mp3";
import BGMusic from "../assets/Sounds/Monopoly-Live-Background-Music.mp3";

let isPlaying = false;
export default function Homepage() {
    const [page, setPage] = useState('');
    const [ablePlay, setablePlay] = useState(false);
    const [screenwidth, setscreenwidth] = useState(0);
    useEffect(()=>{
        function getWindowDimensions() {
            const { innerWidth: width, innerHeight: height } = window;
            return {
                width,
            };
        }
        let width = getWindowDimensions();
        setscreenwidth(width.width);

        //Play bg sound
        if(!isPlaying){
            isPlaying = true;
            setablePlay(true);
            const playAgain = () =>{
                isPlaying = false;
            }
            setTimeout(playAgain, 40000)
        }
        
    }, [])

    useEffect(()=>{
        //Play bg sound
        if(!isPlaying){
            isPlaying = true;
            setablePlay(true);
            const playAgain = () =>{
                setablePlay(false);
                isPlaying = false;
                setablePlay(true);
            }
            setTimeout(playAgain, 40000)
        }
    }, [isPlaying])

    useEffect(()=>{
        let positions = {
            "pos1": "Start",
            "pos2": "naar_gevang",
            "pos3": "belastingen2",
            "pos4": "kaartje4"
        }

        for (let key in positions) {
            console.log(positions[key]);
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

        console.log(positions);

    }, [])

    return (
    <div>
        {/* <BoardInterface /> */}
        {page === '' ? 
        <div className={styles.pageHome}>
            {screenwidth > 999 ? 
            <div className={styles.containerHome}>
                <audio autoPlay loop><source src={BGMusic} type="audio/ogg"/></audio> 
                <img src={mascotte_homepage} alt="mascotte"/>
                <p>Fitopoly</p>
                <p>Welcome to Fitopoly! The nicest and sportiest version of Monopoly!</p>
                <button onClick={() => setPage('create')}>Create game</button>
            </div> 
            : 
            <div className={styles.containerHome}>
                <img src={mascotte_homepage} alt="mascotte"/>
                <p>Fitopoly</p>
                <p>Welcome to Fitopoly! The nicest and sportiest version of Monopoly!</p>
                <button onClick={() => setPage('join')}>Join game</button>
            </div>
            }
        </div> 
        : 
        <div>
            {
            page === 'create' ? <div><audio autoPlay loop><source src={BGMusic} type="audio/ogg"/></audio><QRCode /></div> : (
            page === 'join' ? <div><QRCamera /></div> : 
            '')}  
        </div>
        }
    </div>
    )
}