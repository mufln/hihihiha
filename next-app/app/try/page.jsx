'use client'
import { useState, useEffect } from "react"
import { EditorState, convertToRaw, convertFromRaw, RichUtils } from "draft-js"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Modifier } from 'draft-js';


// Dynamically import the Editor component to avoid SSR issues
const Editor = dynamic(
  () => import("draft-js").then(mod => mod.Editor),
  { ssr: false }
)

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  useEffect(() => {
    // Load saved content from localStorage on component mount
    const savedContent = localStorage.getItem("draftContent")
    if (savedContent) {
      const content = convertFromRaw(JSON.parse(savedContent))
      setEditorState(EditorState.createWithContent(content))
    }
  }, [])

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState)
  }

  const saveContent = () => {
    const content = editorState.getCurrentContent()
    const rawContent = convertToRaw(content)
    localStorage.setItem("draftContent", JSON.stringify(rawContent))
    alert("Content saved successfully!")
  }

  const styleMap = {
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
    'ITALIC': {
      fontStyle: 'italic',
    },
    'BOLD': {
      fontWeight: 'bold',
    },
    'UNDERLINE': {
      textDecoration: 'underline',
    },
  }

  const handleKeyCommand = (command) => {
    if (command === 'header-one') {
      toggleHeading(1);
      return 'handled';
    } else if (command === 'header-two') {
      toggleHeading(2);
      return 'handled';
    } else if (command === 'header-three') {
      toggleHeading(3);
      return 'handled';
    } else if (command === 'strikethrough') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
      return 'handled'
    } else if (command === 'italic') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
      return 'handled'
    } else if (command === 'bold') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
      return 'handled'
    } else if (command === 'underline') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleStrikethrough = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))
  }

  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const toggleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }

  const toggleHeading = (level) => {
    const selection = editorState.getSelection();
    const blockType = `header-${level}`;
  
    const newEditorState = EditorState.push(
      editorState,
      Modifier.setBlockType(
        editorState.getCurrentContent(),
        selection,
        blockType
      )
    );
  
    setEditorState(newEditorState);
  };

  const toggleList = (type) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type))
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Rich Text Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-2 mb-4">
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            customStyleMap={styleMap}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={() => setEditorState(EditorState.createEmpty())}>
            Clear
          </Button>
          <Button onClick={saveContent}>
            Save
          </Button>
          <Button onClick={toggleStrikethrough}>
            Strikethrough
          </Button>
          <Button onClick={toggleItalic}>
            Italic
          </Button>
          <Button onClick={toggleBold}>
            Bold
          </Button>
          <Button onClick={toggleUnderline}>
            Underline
          </Button>
          <Button onClick={() => toggleHeading(1)}>
            H1
          </Button>
          <Button onClick={() => toggleHeading(2)}>
            H2
          </Button>
          <Button onClick={() => toggleHeading(3)}>
            H3
          </Button>
          <Button onClick={() => toggleList('unordered-list-item')}>
            UL
          </Button>
          <Button onClick={() => toggleList('ordered-list-item')}>
            OL
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}