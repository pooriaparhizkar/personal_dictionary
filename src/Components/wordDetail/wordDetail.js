import React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./wordDetail.scss";

function WordDetail({ item }) {
  return (
    <div className="word-detail">
      <span>
        {item.role} - {item.pron}
      </span>
      <h5>{item.description}</h5>
      <h6>{item.translate}</h6>
      {item.different_meanings && item.different_meanings.length !== 0 && (
        <div className="other">
          <label>Other Meanings:</label>
          {item.different_meanings.map((item, index) => (
            <span key={index}>
              {index + 1} - {item}{" "}
            </span>
          ))}
        </div>
      )}
      {item.example && item.example.length !== 0 && (
        <>
          <span>Examples:</span>
          {item.example.map(
            (example, idx) =>
              idx < 3 && (
                <div key={idx} className="exampleContainer">
                  <p>
                    {idx + 1} - {example}
                  </p>
                </div>
              )
          )}
        </>
      )}
      <div className="soundContainer">
        {item.pronounce_audio_us_link !== "Audio not found" && (
          <div>
            US:
            <audio src={item.pronounce_audio_us_link} controls />
          </div>
        )}
        {item.pronounce_audio_uk_link !== "Audio not found" && (
          <div>
            UK:
            <audio src={item.pronounce_audio_uk_link} controls />
          </div>
        )}
      </div>
      <span className="spacer" />
      <Button
        onClick={() => window.open(item.url, "_target")}
        className="link"
        type="primary"
      >
        Cambridge <LinkOutlined />
      </Button>
    </div>
  );
}

export default WordDetail;
