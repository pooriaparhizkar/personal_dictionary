import React, { useState } from "react";
import { SoundOutlined } from "@ant-design/icons";
import { Button } from "antd";

function ChildrenCreator({ item }) {
  const [usSoundLoading, setUsSoundLoading] = useState(false);
  const [ukSoundLoading, setUkSoundLoading] = useState(false);
  const playAudio = (link) => {
    new Audio(link)
      .play()
      .then(() => {
        setUsSoundLoading(false);
        setUkSoundLoading(false);
      })
      .catch((error) => {
        console.error("Audio playback error:", error);
      });
  };

  return (
    <div>
      <span>{item.role}</span>
      <h5>{item.description}</h5>
      <h6>{item.translate}</h6>
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
          <Button
            onClick={() => {
              setUsSoundLoading(true);
              playAudio(item.pronounce_audio_us_link);
            }}
            className="sound"
            loading={usSoundLoading}
            type="primary"
          >
            US <SoundOutlined />
          </Button>
        )}
        {item.pronounce_audio_uk_link !== "Audio not found" && (
          <Button
            onClick={() => {
              setUkSoundLoading(true);
              playAudio(item.pronounce_audio_uk_link);
            }}
            className="sound"
            loading={ukSoundLoading}
            type="primary"
          >
            UK <SoundOutlined />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ChildrenCreator;