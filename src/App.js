import wordsData from "./words_output.json";
import { useEffect, useState } from "react";
import { Button, DatePicker, Collapse } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./App.scss";
import ChildrenCreator from "./children";

function App() {
  const PERIOD = 20;
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
    boxShadow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px",
    background: "rgba(255, 255, 255, 0.01)",
    borderRadius: 8,
    overflow: "hidden",
  };

  useEffect(() => {
    const wordsList = [];
    let temp = [];
    wordsData.map((item, index) => {
      temp.push({
        key: index,
        label: item.title,
        children: <ChildrenCreator item={item} key={index} />,
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
        size="large"
        className="words"
        items={words[currentDate.getDate() % PERIOD]}
        defaultActiveKey={["1"]}
      />
    </div>
  );
}

export default App;
