import React, { useEffect, useState } from "react";
import "./exam.scss";
import { Button } from "antd";
import ExamCounter from "./counter/counter";
export default function ExamContent(props) {
  const [stats, setStats] = useState(0);
  const [words, setWords] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [wordTitle, setWordTitle] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  useEffect(() => {
    setWords(shuffle(props.wordsList));
  }, []);

  function shuffle(array) {
    const temp = array;
    let currentIndex = temp.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [temp[currentIndex], temp[randomIndex]] = [
        temp[randomIndex],
        temp[currentIndex],
      ];
    }
    return temp;
  }
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomOption(originalDescription) {
    const randIndex = randomNumber(1, props.wordsList.length);
    const temp = words[randIndex].description;
    if (temp !== originalDescription)
      return { text: temp, index: words[randIndex].title };
    return getRandomOption(originalDescription);
  }

  useEffect(() => {
    if (stats === 2) {
      setSelectedAnswer(undefined);
      setWordTitle(words[answers.length + 1].title);
      const options = [];
      console.log(words, words[answers.length + 1], answers.length + 1);
      options.push({
        text: words[answers.length + 1].description,
        index: words[answers.length + 1].title,
      });
      options.push(getRandomOption());
      options.push(getRandomOption());
      options.push(getRandomOption());
      shuffle(options);
      setOptions(options);
    }
  }, [answers, stats]);

  return (
    <div className="exam-content">
      {stats === 0 ? (
        <Button onClick={() => setStats(1)}>Start</Button>
      ) : stats === 1 ? (
        <ExamCounter onFinish={() => setStats(2)} />
      ) : (
        <>
          <h6>{wordTitle}</h6>
          {options.map((item) => (
            <Button
              className={`options ${
                selectedAnswer === item.index ? "false" : ""
              } ${
                selectedAnswer && item.index === words[answers.length + 1].title
                  ? "true"
                  : ""
              }`}
              key={item.index}
              onClick={() => {
                setSelectedAnswer(item.index);
              }}
            >
              {item.text}
            </Button>
          ))}
          <Button type={"primary"} onClick={() => setAnswers([...answers, 1])}>
            Next
          </Button>
          <Button
            disabled={answers.length === 0}
            type={"primary"}
            onClick={() => setAnswers([...answers.slice(0, -1)])}
          >
            Back
          </Button>
        </>
      )}
    </div>
  );
}
