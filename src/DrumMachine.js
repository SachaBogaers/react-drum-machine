import React, { useState, useEffect } from 'react';
import Display from './Display'
import meow_1 from './audio/meow_1.mp3'
import meow_2 from './audio/meow_2.wav'
import purr_1 from './audio/purr_1.wav'
import cute_meow_1 from './audio/cute_meow_1.mp3'
import cute_meow_2 from './audio/cute_meow_2.wav'
import hiss_1 from './audio//hiss_1.wav'
import loud_meow_1 from './audio/loud_meow_1.mp3'
import loud_meow_2 from './audio/loud_meow_2.wav'
import hiss_2 from './audio/hiss_2.wav'


function DrumMachine() {
	const [active, setActive] = useState("Make the cats meow!")

	const drumPads = [
		{ buttonText: "Q", src: meow_1, displayText: "Meow 1" },
		{ buttonText: "W", src: meow_2, displayText: "Meow 2" },
		{ buttonText: "E", src: purr_1, displayText: "Purr 1" },
		{ buttonText: "A", src: cute_meow_1, displayText: "Cute meow 1" },
		{ buttonText: "S", src: cute_meow_2, displayText: "Cute meow 2" },
		{ buttonText: "D", src: hiss_1, displayText: "Hiss 1" },
		{ buttonText: "Z", src: loud_meow_1, displayText: "Loud meow 1" },
		{ buttonText: "X", src: loud_meow_2, displayText: "Loud meow 2" },
		{ buttonText: "C", src: hiss_2, displayText: "Hiss 2" },
	]

	const play = (e, displayText) => {
		let newDisplayText = displayText
		let audio = e.target.children[0]
		if (e.type === "keydown") {
			const letter = e.key.toUpperCase()
			const drumPadLetters = drumPads.map(drumpad => drumpad.buttonText);
			if (drumPadLetters.includes(letter)) {
				audio = document.getElementById(`${letter}`)
				// filter data by letter to get displaytext 
				newDisplayText = drumPads.filter(drumPad => {
					return drumPad.buttonText === letter
				})[0].displayText
				console.log(newDisplayText, "button")
			} else {
				newDisplayText = "Please enter a valid letter"
				setActive(newDisplayText)
				return;
			}
		} else if (e.type === "click") {
			audio = e.target.children[0]
		}
		audio.play()
			.catch(error => {
				console.log(error)
			})
		setActive(newDisplayText)
	}

	// Get the play function to also work on Keydown
	// Only listen to the allowed keys, and then play the associated audio clip


	useEffect(() => {
		window.addEventListener("keydown", play);
		// Remove event listeners on cleanup
		console.log("adding event listener")
		return () => {
			window.removeEventListener("keydown", play);
		};
	}, []);

	return (
		<main id="drum-machine">
			<Display text={active} />
			{drumPads.map(drumPad => {
				return (
					<button
						className="drum-pad"
						id={`${drumPad.displayText}`}
						onClick={e => play(e, drumPad.displayText)}
						key={drumPad.buttonText}>
						{drumPad.buttonText}
						<audio
							className="clip"
							id={`${drumPad.buttonText}`}
							src={drumPad.src}
							preload="auto"
						></audio>
					</button>)
			})}

		</main>
	);
}

export default DrumMachine;
