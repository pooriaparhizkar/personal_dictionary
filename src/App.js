import wordsData from "./words_output.json";
import { useEffect, useState } from "react";
import { Button, DatePicker, Collapse, Modal } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./App.scss";
import WordDetail from "./Components/wordDetail/wordDetail";
import Header from "./Components/Header/Header";
import ExamContent from "./Components/exam/exam";

function App() {
  const PERIOD = 30;
  const [words, setWords] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isExamOpen, setIsExamOpen] = useState(false);
  function addDays(days, date = currentDate) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const panelStyle = {
    marginBottom: 16,
    border: "none",
    boxShadow: "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px",
    background: "rgba(255, 255, 255, 0.02)",
    borderRadius: 8,
    overflow: "hidden",
  };

  useEffect(() => {
    const wordsList = [];
    let temp = [];
    wordsData.map((item, index) => {
      temp.push({
        key: index,
        label: `${item.title} ${item.isCambridge ? " ✓" : ""}`,
        children: <WordDetail item={item} key={index} />,
        style: panelStyle,
        item: item,
      });
      if ((index + 1) % PERIOD === 0) {
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
      <Header />
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
      {/* <Button className="exam" onClick={() => setIsExamOpen(true)}>
        Take an Exam
      </Button> */}

      <Modal
        footer={null}
        closable
        destroyOnClose
        open={!!isExamOpen}
        title="Exam"
        focusTriggerAfterClose={() => setIsExamOpen(undefined)}
        onCancel={() => setIsExamOpen(undefined)}
      >
        <ExamContent
          wordsList={words[currentDate.getDate() % PERIOD]?.map(
            (item) => item.item
          )}
        />
      </Modal>
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
