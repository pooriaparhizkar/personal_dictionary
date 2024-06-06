import wordsData from "./words_output.json";
import { useEffect, useState } from "react";
import { Button, DatePicker, Collapse } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined, SoundOutlined } from "@ant-design/icons";
import "./App.scss";

function App() {
  const PERIOD = 14;
  const [words, setWords] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  function addDays(days, date = currentDate) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const panelStyle = {
    marginBottom: 16,
    border: "none",
    boxShadow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;",
    background: "rgba(255, 255, 255, 0.01)",
    borderRadius: 8,
    overflow: "hidden",
  };

  function childrenCreator(item) {
    return (
      <div>
        <span>{item.role}</span>
        <h5>{item.description}</h5>
        <h6>{item.translate}</h6>
        {item.example && item.example.length !== 0 && (
          <>
            <span>Examples:</span>
            {item.example.map(
              (item, index) =>
                index < 3 && (
                  <div key={index} className="exampleContainer">
                    <p>
                      {index + 1} - {item}
                    </p>
                  </div>
                )
            )}
          </>
        )}
        <div className="soundContainer">
          {item.pronounce_audio_us_link !== "Audio not found" && (
            <div
              onClick={() => playAudio(item.pronounce_audio_us_link)}
              className="sound"
            >
              US
              <SoundOutlined />
            </div>
          )}
          {item.pronounce_audio_uk_link !== "Audio not found" && (
            <div
              onClick={() => playAudio(item.pronounce_audio_uk_link)}
              className="sound"
            >
              UK
              <SoundOutlined />
            </div>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const wordsList = [];
    let temp = [];
    wordsData.map((item, index) => {
      temp.push({
        key: index,
        label: item.title,
        children: childrenCreator(item),
        style: panelStyle,
      });
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
    <div className="dictionary">
      <h1>Pooria's Dictionary</h1>
      <div className="controller">
        <Button type={"primary"} onClick={() => changeDay(-1)}>
          <LeftOutlined />
        </Button>
        <DatePicker
          allowClear={false}
          value={dayjs(currentDate)}
          onChange={(e) => setCurrentDate(new Date(e))}
        />
        <Button type={"primary"} onClick={() => changeDay(+1)}>
          <RightOutlined />
        </Button>
      </div>
      <Collapse
        className="words"
        size="large"
        items={words[currentDate.getDate() % PERIOD]}
        defaultActiveKey={["1"]}
      />
      {words[currentDate.getDate() % PERIOD]?.map((item, index) => (
        <div key={index}>
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
