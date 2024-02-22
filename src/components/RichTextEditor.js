import React, { useEffect, useState } from "react";
import "./RichTextCss.css";

import {
  ContentState,
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
const RichEditorExample = () => {
  const [editorState, setEditorState] = useState(() => {
    // Get the saved content from localStorage
    const savedContent = localStorage.getItem("savedContent");

    // Create EditorState with the saved content or an empty content
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });
  const [stack, setStack] = useState([]);
  const [stackAsterisk, setStackAsterisk] = useState([]);

  const [isHeaderOne, setIsHeaderOne] = useState(true);

  const customStyleMap = {
    RED_TEXT: {
      color: "red",
    },
  };

  // useEffect(() => {
  //   // This code will be executed after the state has been updated
  //   console.log("stack 1", stackAsterisk.length);
  //   console.log("stack 2", stackDoubleAsterisk.length);
  //   console.log("stack 3", stackTripleAsterisk.length);
  // }, [stackAsterisk, stackDoubleAsterisk, stackTripleAsterisk]);
  const handleBold = () => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    console.log(currentInlineStyle);
  };

  const handleHeader = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    const newText = "";

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const newContentState = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: currentText.length - 1,
        focusOffset: currentText.length,
      }),
      newText,
      currentInlineStyle
    );

    const blockType = isHeaderOne ? "header-one" : "unstyled";

    const newContentStateWithBlockType = Modifier.setBlockType(
      newContentState,
      selection,
      blockType
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentStateWithBlockType,
      "change-block-type"
    );

    const movedSelection = EditorState.moveFocusToEnd(newEditorState);

    setEditorState(movedSelection);
    setIsHeaderOne(!isHeaderOne);
    setStack([]);
  };
  const handleBld = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    const newText = "";

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const newContentState = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: currentText.length - 1,
        focusOffset: currentText.length,
      }),
      newText,
      currentInlineStyle
    );

    // Update the EditorState
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "remove-character"
    );

    // Apply BOLD style to the new content
    const isBold = currentInlineStyle.has("BOLD");

    // Toggle the "BOLD" style
    const newInlineStyle = isBold
      ? currentInlineStyle.remove("BOLD")
      : currentInlineStyle.add("BOLD");
    const finalEditorState = EditorState.setInlineStyleOverride(
      newEditorState,
      newInlineStyle
    );

    setEditorState(finalEditorState);
    setStack([]);
  };
  const handleRedLine = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    const newText = "";

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const newContentState = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: currentText.length - 2,
        focusOffset: currentText.length,
      }),
      newText,
      currentInlineStyle
    );

    // Update the EditorState
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "remove-character"
    );

    // Apply BOLD style to the new content
    const isBold = currentInlineStyle.has("RED_TEXT");

    // Toggle the "BOLD" style
    const newInlineStyle = isBold
      ? currentInlineStyle.remove("RED_TEXT")
      : currentInlineStyle.add("RED_TEXT");
    const finalEditorState = EditorState.setInlineStyleOverride(
      newEditorState,
      newInlineStyle
    );

    setEditorState(finalEditorState);
    setStack([]);
  };
  const handleUnderline = () => {
    console.log("under");
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    const newText = "";

    const currentInlineStyle = editorState.getCurrentInlineStyle();

    const newContentState = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: currentText.length - 3,
        focusOffset: currentText.length,
      }),
      newText,
      currentInlineStyle
    );

    // Update the EditorState
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "remove-character"
    );

    // Apply BOLD style to the new content
    const isBold = currentInlineStyle.has("UNDERLINE");

    // Toggle the "BOLD" style
    const newInlineStyle = isBold
      ? currentInlineStyle.remove("UNDERLINE")
      : currentInlineStyle.add("UNDERLINE");
    const finalEditorState = EditorState.setInlineStyleOverride(
      newEditorState,
      newInlineStyle
    );

    setEditorState(finalEditorState);
    setStack([]);
  };
  function myKeyBindingFn(e) {
    if (e.key != "Shift")
      setStackAsterisk((prevStack) => [...prevStack, e.key]);
    console.log(stackAsterisk[stackAsterisk.length - 1]);
    if (
      e.key == " " &&
      stackAsterisk[stackAsterisk.length - 1] == "*" &&
      stackAsterisk[stackAsterisk.length - 2] == "*" &&
      stackAsterisk[stackAsterisk.length - 3] == "*"
    ) {
      handleUnderline();
      setStackAsterisk([]);
    } else if (
      e.key == " " &&
      stackAsterisk[stackAsterisk.length - 1] == "*" &&
      stackAsterisk[stackAsterisk.length - 2] == "*"
    ) {
      handleRedLine();
      setStackAsterisk([]);
    } else if (e.key == " " && stackAsterisk[stackAsterisk.length - 1] == "*") {
      handleBld();
      setStackAsterisk([]);
    } else if (e.key == " " && stackAsterisk[stackAsterisk.length - 1] == "#") {
      handleHeader();
      setStackAsterisk([]);
    }

    return getDefaultKeyBinding(e);
  }
  const saveData = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    const jsonData = JSON.stringify(raw, null, 2);
    localStorage.setItem("savedContent", jsonData);
    console.log(jsonData);
    return jsonData;
  };

  return (
    <div className="parent">
      <div>
        <h5>
          Demo Editor by Toya Lazmin Khan{" "}
          <button onClick={saveData}>Save</button>
        </h5>
      </div>

      <div className="border-line">
        <Editor
          placeholder="Please Type"
          editorState={editorState}
          onChange={setEditorState}
          keyBindingFn={myKeyBindingFn}
          customStyleMap={customStyleMap}
        />
        <p>Note: In order to turn off any style need to use the command again to turn it off</p>
      </div>
    </div>
  );
};
export default RichEditorExample;
