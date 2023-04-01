import React, { useState } from "react";
import axios from "axios";
import './home.css'

const ToneAnalyzer = () => {
  const [sentence, setSentence] = useState("");
  const [tone, setTone] = useState("");
  const [suggestedSentence, setSuggestedSentence] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = "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";
    const toneApiUrl = `https://api.openai.com/v1/engines/content-filter-alpha-2/tokens`;

    const response = await axios.post(
      toneApiUrl,
      { prompt: sentence, max_tokens: 1 },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Extract the tone of the sentence from the API response
    const tone = response.data.text;
    setTone(tone);

    const grammarApiKey = "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";
    const grammarApiUrl = `https://api.openai.com/v1/engines/davinci-codex/completions`;

    const grammarResponse = await axios.post(
      grammarApiUrl,
      {
        prompt: `Improve the following sentence: "${sentence}"`,
        max_tokens: 60,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${grammarApiKey}`,
        },
      }
    );

    // Extract the suggested sentence from the API response
    const suggestedSentence =
      grammarResponse.data.choices[0].text !== ""
        ? grammarResponse.data.choices[0].text
        : "No suggestions available";
    setSuggestedSentence(suggestedSentence);
  };

  return (
    <div className="container">
      <h1 className="text-center">Text Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sentence">Enter a sentence:</label>
          <input
            type="text"
            className="form-control"
            id="sentence"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          Analyze
        </button>
      </form>
      <div className="mt-4">
        <p>Tone of the sentence: {tone}</p>
        <p>Better version of the sentence: {suggestedSentence}</p>
      </div>
    </div>
  );
};

export default ToneAnalyzer;
