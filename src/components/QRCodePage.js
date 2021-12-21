import QRCode from "react-qr-code";
import io from "socket.io-client";
import { useState, useEffect } from "react"
import Lobby from "./Lobby";
import styles from "./QRcodepage.module.css";
import PlayerJoins from "../assets/Sounds/mixkit-arcade-retro-changing-tab-206.wav";
import MultiPlayer from "./Multiplayer";

let socket;
let playSound = false;
export default function QRCodePage(){
	
    const CONNECTION_PORT = "https://passionprojectserver.herokuapp.com/"
	useEffect(() => {
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT]);

	const [room, setRoom] = useState('');
	const [amountUsers, setamountUsers] = useState(0);
	const [startGame, setstartGame] = useState(false);
	
	const [soundEffect, setsoundEffect] = useState(PlayerJoins);
  	const [playSoundEffect, setplaySoundEffect] = useState(false);
	useEffect(()=>{
		randomCode();

		socket.on('successful_connection', (amountPlayers)=>{
			setamountUsers(amountPlayers);
			playSound = true;
			if(playSound){
				playSound = false;
				setsoundEffect(PlayerJoins)
				setplaySoundEffect(true);

				const enableSound = () =>{
				playSound = true;
				setplaySoundEffect(false);
				}
				setTimeout(enableSound, 2000);
			}
		})
	}, [])

	const randomCode = () =>{
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < 3; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		setRoom(result);
		socket.emit('create_room', result);

		fetchFunction(result);
	}

	const fetchFunction = async (roomCode) =>{
    	const fet = await fetch('https://passionprojectjson.herokuapp.com/data');
    	const data = await fet.json()	
    	data[roomCode] = data.template	
    	const fet2 = await fetch('https://passionprojectjson.herokuapp.com/data', {
			mode:'cors',
    	    method: 'POST',
    	    headers: {
    	        'Content-Type': 'application/json',
    	    },
    	    body: JSON.stringify(data),
    	})
    	const res2 = await fet2.json();
    	console.log(res2);
    }

	const closeRoom = () =>{		
		setstartGame(true);
		socket.emit('start_game', room);
	}

    return (
        <div>
			{playSoundEffect ? <MultiPlayer urls={[soundEffect]}/> : ''}
			{!startGame && amountUsers < 5 ? 
			<div className={styles.containerQRP}>
				<div className={styles.QRPBG}></div>
				<div className={styles.qrCodeBG}>
					<QRCode className={styles.qrCode} value={room}/>
				</div>
				<p>Players in room: {amountUsers > 0 ? amountUsers-1 : amountUsers}</p>
				<button onClick={()=>closeRoom()}>Start game</button>
			</div> 
			: 
			<div>
				<Lobby playerNumber={0} creatorJoined={true} room={room} amountUsers={amountUsers}/>
			</div>
			}
            
        </div> 
    )
}