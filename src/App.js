import wordsData from "./words_output.json";
import { useEffect, useState } from "react";
import { Button, DatePicker, Collapse, Modal, Checkbox } from "antd";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined, ReloadOutlined } from "@ant-design/icons";
import "./App.scss";
import WordDetail from "./Components/wordDetail/wordDetail";
import Header from "./Components/Header/Header";
import ExamContent from "./Components/exam/exam";

function App() {
  const PERIOD = 30; // Number of days before the cycle repeats
  const [words, setWords] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [isCambridge, setIsCambridge] = useState(false);
  const startDate = new Date(2024, 0, 1); // Set a start date (e.g., Jan 1, 2024)

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
    wordsData.forEach((item, index) => {
      if (isCambridge && !item.isCambridge) return;
      temp.push({
        key: index,
        label: `${item.title} ${item.isCambridge ? " ✓" : ""}`,
        children: <WordDetail item={item} key={index} />,
        style: panelStyle,
        item: item,
      });
      if (temp.length === PERIOD) {
        wordsList.push(temp);
        temp = [];
      }
    });
    if (temp.length) {
      wordsList.push(temp);
    }
    setWords(wordsList);
  }, [isCambridge]);

  function changeDay(delta) {
    setCurrentDate(addDays(delta));
  }

  // Calculate the index based on the number of days since the start date
  const getWordIndex = () => {
    const daysPassed = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );
    return daysPassed % words.length;
  };

  const handleHardReload = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }

    // Clear browser cache and reload the page
    caches
      .keys()
      .then((names) => {
        for (let name of names) {
          caches.delete(name);
        }
      })
      .then(() => {
        // Reload the page after clearing cache and unregistering service workers
        window.location.reload(true);
      });
  };

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
          wordsList={words[getWordIndex()]?.map((item) => item.item)}
        />
      </Modal>
      <div className="filter-container">
        <Button size="small" type="primary" danger onClick={handleHardReload}>
          <ReloadOutlined />
        </Button>
        <span />
        <label>isCambridge</label>
        <Checkbox
          checked={isCambridge}
          onChange={(e) => setIsCambridge(e.target.checked)}
        />
      </div>
      <Collapse
        size="large"
        className="words"
        items={words[getWordIndex()]}
        defaultActiveKey={["1"]}
      />
    </div>
  );
}

export default App;
