import "./App.css";
import wordsData from "./words_output.json";
import { useEffect, useState } from "react";

function App() {
  const PERIOD = 14;
  const [words, setWords] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  function addDays(days, date = currentDate) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const wordsList = [];
    let temp = [];
    wordsData.map((item, index) => {
      temp.push(item);
      if ((index + 1) % (wordsData.length / PERIOD) === 0) {
        wordsList.push(temp);
        temp = [];
      }
    });
    setWords(wordsList);
  }, []);

  function changeDay(delta) {
    setCurrentDate(addDays(delta));
  }
  function playAudio(link) {
    new Audio(link).play();
  }
  return (
    <div className="App">
      <h1>Pooria's Dictionary</h1>
      <div style={{ display: "flex" }}>
        <button onClick={() => changeDay(-1)}>Previous</button>
        <h4>
          {months[currentDate.getMonth()]} {currentDate.getDate()}
        </h4>
        <button onClick={() => changeDay(+1)}>Next</button>
      </div>

      {words[currentDate.getDate() % PERIOD]?.map((item, index) => (
        <div
          style={{
            borderTop: "solid 1px gray",
            paddingTop: "16px",
            marginTop: "16px",
          }}
          key={index}
        >
          <span>{index + 1}</span>
          <h4>{item.title}</h4>
          <h6>{item.description}</h6>
          <h6>{item.translate}</h6>
          {item.pronounce_audio_us_link !== "Audio not found" && (
            <button onClick={() => playAudio(item.pronounce_audio_us_link)}>
              us
            </button>
          )}
          {item.pronounce_audio_uk_link !== "Audio not found" && (
            <button onClick={() => playAudio(item.pronounce_audio_uk_link)}>
              uk
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
