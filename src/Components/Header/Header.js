import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import ".//Header.scss";
import wordsData from "../../words_output.json";
import WordDetail from "../wordDetail/wordDetail";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSearchResult, setSelectedSearchResult] = useState();
  return (
    <>
      <div className="header">
        <h1>Essential words for the IELTS</h1>
        <h4>Pooria's Edition</h4>
        <div className="search">
          <Input
            className={searchTerm ? "active" : ""}
            onChange={(e) => {
              console.log(e.target.value);
              setSearchTerm(e.target.value);
            }}
            size="large"
            placeholder="Enter your word"
            prefix={<SearchOutlined />}
          />
          {searchTerm && (
            <div className="result">
              {wordsData.filter((word) =>
                word.title.toLowerCase().includes(searchTerm.toLowerCase())
              ).length !== 0 ? (
                wordsData
                  .filter((word) =>
                    word.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((word, index) => (
                    <label
                      onClick={() => setSelectedSearchResult(word)}
                      className="item"
                      key={index}
                    >
                      {word.title}
                    </label>
                  ))
              ) : (
                <p className="no-result">
                  No Result Found, search in{" "}
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://dictionary.cambridge.org/spellcheck/english/?q=${searchTerm}`}
                  >
                    <Button type="link">Cambrdige</Button>
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        footer={null}
        closable
        destroyOnClose
        title={selectedSearchResult?.title}
        open={!!selectedSearchResult}
        focusTriggerAfterClose={() => setSelectedSearchResult(undefined)}
        onCancel={() => setSelectedSearchResult(undefined)}
      >
        <WordDetail item={selectedSearchResult} />
      </Modal>
    </>
  );
}
