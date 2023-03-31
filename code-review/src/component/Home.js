import React, { useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

function ReportGenerator() {
  const [tone, setTone] = useState("");
  const [quality, setQuality] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const analyze = async () => {
    const inputText = document.getElementById('input-text').value;

    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci/tone', {
        prompt: 'Please analyse the following paragraph for its quality attributes and give a score or 0-5 for each quality attribute : "{inputText}". Return the results in this format: <Grammar>#<Punctuation>#<Spelling>#<Clarity>#<Conciseness>#<Coherence>#<Vocabulary>#<Tone>#<Readability>#<Style>',
        max_tokens: 1,
        temperature: 0,
        n: 1,
        stop: ['\n']
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
      });

      const data = response.data;
      const tone = data.choices[0].text.trim();
      const quality = data.choices[0].attributes.quality.trim();

      setTone(tone);
      setQuality(quality);
      setShowOutput(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Editor id="input-text" apiKey="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" />
      <button onClick={analyze}>Generate Report</button>
      {showOutput &&
        <div>
          <h3>Tone: {tone}</h3>
          <h3>Quality: {quality}</h3>
        </div>
      }
    </div>
  );
}

export default ReportGenerator;
