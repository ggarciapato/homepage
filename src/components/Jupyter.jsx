import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Container
} from "@material-ui/core";

import { Slideshow } from "./Slideshow";

function sortContent(cells) {
  let output = [];
  let wasImage = false;
  let wasText = false;
  cells.forEach(cell => {
    let content = {
      type: null,
        image: null,
        text: null
    }
    if (cell.cell_type === "markdown") {
      if (wasImage) {
        let previousContent = output.pop();
        previousContent['text'] = cell.source;
        output.push(previousContent);
        wasImage = false;
        // wasText = false;
      } else {
        let isTitle = cell.source[0].startsWith('#') 
        if (isTitle) {
          content['type'] = 'title'
          content['text'] = cell.source;
          wasText = false;
          output.push(content);
        } else {
          if (wasText) {
            let previousCell = output.pop();
            let withNewParagraph = (
              previousCell.text
              .concat(['\n'])
              .concat(cell.source)
            )
            previousCell.text = withNewParagraph;
            output.push(previousCell);
          } else {
            content.type = 'text';
            content.text = cell.source;
            output.push(content);
            wasText = true;
          }
        }
      }
    } else {
      if (cell.outputs.length === 1) {
        let op;
        [op] = cell.outputs;
        content['type'] = 'image'
        content['image'] = op.data['image/png'];
        output.push(content);
        wasImage = true;
        wasText = false;
      }
    }
  })
  return output;
}

export function Jupyter(props) {
  const [state, setState] = useState({
    notebook: null,
    isLoading: true
  });

  async function getNotebook() {
    await fetch(props.ipynb)
    .then((response) => response.text())
    .then(async (text) => {
      try {
        const parsed = JSON.parse(text); 
        setState({ 
          notebook: parsed,
          isLoading: false
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  useEffect(() => {
    getNotebook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.isLoading) { 
    return (<p> Loading... </p>);
  }
    
  const content = sortContent(state.notebook.cells);
  const title = content.shift();
  return (
    <>
      <Container>
        <ReactMarkdown>
          {title.text.join(' ')}
        </ReactMarkdown>
      </Container>
      <Container>
        <Slideshow content={content} />
      </Container>
    </>
  );
}