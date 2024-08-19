import { useState } from 'react'
import './App.scss'
import cat1 from './images/1.png'
import cat2 from './images/2.png'
import cat3 from './images/3.png'
import cat4 from './images/4.png'
import cat5 from './images/5.png'
import cat6 from './images/6.png'


interface AppState {
  frameRateInFps: string
  bitRate: string
  width: string
  height: string
  mbpsIsSelected: boolean
}

const initialAppState = {
  frameRateInFps: "",
  bitRate: "",
  width: "",
  height: "",
  mbpsIsSelected: false
}

function App() {

  const [state, setState] = useState<AppState>(initialAppState)
  const [result, setResult] = useState(0)

  function pixelRatioRelatedTo1080p(width: number, height: number) {
    const referenceTotal = 1920 * 1080
    const comparisonTotal = width * height
    return comparisonTotal / referenceTotal
  }

  function calculateChonk() {
    if (state.bitRate === "" || state.frameRateInFps === "" || state.height === "" || state.width === "") {
      //TODO Handle Error
    } else {
      const frameRate = Number(state.frameRateInFps)
      const bitRate = state.mbpsIsSelected ? Number(state.bitRate) : Number(state.bitRate) / 1000
      const height = Number(state.height)
      const width = Number(state.width)
      const result = frameRate * (bitRate / 2) * pixelRatioRelatedTo1080p(width, height)
      setResult(result)
    }
  }

  function determineLabel() {
    if (result <= 29) { return { title: "A Fine Boi", description: "This is excellent. A perfect specimen.", image: cat1, colour: "#67B75F" } }
    else if (result <= 39) { return { title: "He Chonk", description: "This is a passable file size.", image: cat2, colour: "#E9D845" } }
    else if (result <= 49) { return { title: "A Heckin' Chonker", description: "You may be able to get away with this but you shouldn't have many files this big at all.", image: cat3, colour: "#E2AC3B" } }
    else if (result <= 59) { return { title: "Hefty Chonk", description: "Nah this one ain't it.", image: cat4, colour: "#DA8530" } }
    else if (result <= 69) { return { title: "Megachonker", description: "It's far too big!! Get rid of it!", image: cat5, colour: "#CF4D2A" } }
    else if (result >= 70) { return { title: "Megachonker", description: "There's no way you're keepin' this file.", image: cat6, colour: "#A53E28" } }
  }

  function bitRateUnitsWasChanged(value: string) {
    if (value === "kbps") {
      setState(state => ({ ...state, mbpsIsSelected: false }))
    }
    if (value === "mbps") {
      setState(state => ({ ...state, mbpsIsSelected: true }))
    }
  }

  function valueIsANumber(value: string) {
    const regex = /^\d*\.?\d*$/
    if (regex.test(value)) {
      return true
    } else {
      return false
    }
  }

  function frameRateWasChanged(newString: string) {
    if (valueIsANumber(newString)) {
      setState(state => ({ ...state, frameRateInFps: newString }))
    }
  }

  function bitRateWasChanged(newString: string) {
    if (valueIsANumber(newString)) {
      setState(state => ({ ...state, bitRate: newString }))
    }
  }

  function widthWasChanged(newString: string) {
    if (valueIsANumber(newString)) {
      setState(state => ({ ...state, width: newString }))
    }
  }

  function heightWasChanged(newString: string) {
    if (valueIsANumber(newString)) {
      setState(state => ({ ...state, height: newString }))
    }
  }

  return (<>
    <div id="inputs">
      <input type="text" placeholder='Enter Framerate (FPS)' value={state.frameRateInFps} onChange={e => frameRateWasChanged(e.target.value)}></input>
      <div>
        <input type="text" placeholder={state.mbpsIsSelected ? "Enter Bitrate (mbps)" : "Enter Bitrate (kbps)"} onChange={e => bitRateWasChanged(e.target.value)}></input>
        <select id="bitRateUnits" name="bitRateUnits" onChange={e => bitRateUnitsWasChanged(e.target.value)}>
          <option value="kbps">kbps</option>
          <option value="mbps">mbps</option>
        </select>
      </div>
      <input type="text" placeholder='Enter Width (Pixels)' onChange={e => widthWasChanged(e.target.value)}></input>
      <input type="text" placeholder='Enter Height (Pixels)' onChange={e => heightWasChanged(e.target.value)}></input>
    </div>

    <button onClick={() => calculateChonk()}>Calculate</button>
    <h2>Result</h2>
    {result !== 0 && <>
      <p>{Math.round(result * 100) / 100}</p>
      <h3 style={{ color: determineLabel()?.colour }}>{determineLabel()!.title}</h3>
      <p>{determineLabel()!.description}</p>
      <img src={determineLabel()!.image} />
    </>
    }
  </>
  )
}

export default App;



// Resolutions
// Megabytes or Kilobytes
// Chonky Cat

// <html>
// <head>
//     <title>Chonk Rating Calculator</title>
//     <style>
//         .greenText { color: green; }
//         .redText { color: red; }
//     </style>
// </head>
// <body>
//     <h1>Chonk Rating Calculator</h1>
//     <form id="chonkForm">
//         <label for="frameRate">Frame Rate (in FPS):</label><br>
//         <input type="number" id="frameRate" name="frameRate"><br>
//         <label for="bitRate">Bitrate (in Mbps):</label><br>
//         <input type="number" id="bitRate" name="bitRate"><br>
//         <label for="pixelMultiple">Pixel Multiple:</label><br>
//         <select id="pixelMultiple" name="pixelMultiple">
//             <option value="0.44">1280x720</option>
//             <option value="1">1920x1080</option>
//             <option value="4">3840x2160</option>
//         </select><br>
//         <input type="button" value="Calculate Chonk Rating" onclick="calculateChonk()">
//     </form>
//     <p id="result"></p>

//     <script>
//         function calculateChonk() {
//             var frameRate = document.getElementById('frameRate').value;
//             var bitRate = document.getElementById('bitRate').value;
//             var pixelMultiple = document.getElementById('pixelMultiple').value;

//             var chonkRating = frameRate * (bitRate / 2) * pixelMultiple;
//             var resultElement = document.getElementById('result');
//             resultElement.innerHTML = 'Chonk Rating: ' + chonkRating;
//             if (chonkRating > 30) {
//                 resultElement.className = 'redText';
//             } else {
//                 resultElement.className = 'greenText';
//             }
//         }
//     </script>
// </body>
// </html>


// KNOW YOUR FILE SIZES:
// Had a report that an MPEG billboard with stats as shown in the screenshot on the left was playing on a system, and while able to load it, it was not able to play it properly and reported many errors.

// This handy dandy Cat sizing chart also correlates surprisingly well with the expected performance impact on HDMS hardware with relation to frame rate for 1080p MPEG-4 Files with a bitrate in the range of 2-3mbit. For lower frame rates or higher or lower bit rates, you would apply a multiplier or divisor to assess the likely impact.

// Variables:
// Frame rate (in FPS)
// Bitrate (in Mbps)
// Pixel Multiple (difference in resolution from 1920x1080)
// 1280x720 = 0.44
// 1920x1080 = 1
// 3840x2160 = 4
// So that file, at 50 fps would easily be a HEFTYCHONK. But the higher-than-average bit rate pushes it close to, if not well within MEGACHONK territory.
// At a rough estimate, you would, in general, get away with the occasional Heckin' Chonker if you didn't push your luck, But ideally, all systems would run nothing but Fine Bois unless rated for something higher.
// NOTE: In the case of any file assessed as higher than 70  (e.g. a 4k 24fps file with a pixel multiple of 4 equating to 96), the impact would either be 'off the scale', or Too Heccin' CHOMNKY to even load, thus effectively having zero performance impact by the technicality of having wrapped around to Fine Boi status. Any file assessed as below 16 is a Thoroughly Fine Boi.


