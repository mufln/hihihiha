"use client"

import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Underline, List, Image as ImageIcon } from "lucide-react"

function auto_grow(element: HTMLTextAreaElement) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

export default function ArticleEditor() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selected, setSelected] = useState("")
  const [startselected, setStartselected] = useState(0)
  const [endselected, setEndselected] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelection = (target: EventTarget) => {
    const textarea = target as HTMLTextAreaElement;
    if (textarea) {
      setStartselected(textarea.selectionStart);
      setEndselected(textarea.selectionEnd);
      const selectedText = textarea.value.substring(startselected, endselected);
      // console.log(selectedText)
      // setSelected(selectedText);
    }
  }

  const handleBoldClick = () => {
    setContent(content.substring(0, startselected) + "**" + content.substring(startselected, endselected) + "**" + content.substring(endselected))
    
  }

  const handleItalicClick = () => {
    setContent(content.substring(0, startselected) + "*" + content.substring(startselected, endselected) + "*" + content.substring(endselected))
  }

  const handleUnderlineClick = () => {
    setContent(content.substring(0, startselected) + "__" + content.substring(startselected, endselected) + "__" + content.substring(endselected))
  }

  const handleListClick = () => {
    const lines = content.substring(startselected, endselected).split(/\n/g);
    let newsel = "";
    lines.forEach((line, index) => {
        newsel = newsel + " - " + line + "\n";
    });
    setContent(content.substring(0, startselected) + newsel + content.substring(endselected))
  }

  const handleImageClick = () => {
    setContent(content + "\n![Alt text](image-url)")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, content})
    // Here you would typically send the data to your backend
  }

  return (
    <div className="w-full bg-white p-10 flex flex-wrap gap-10 text-black">
      <Card className="max-w-96 mb-8">
        <CardHeader>
          <h1 className="text-4xl mb-4">Markdown Редактор</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Заголовок
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                  className="mt-1 border-gray-300 border-2 p-2"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Текст
                </label>
                <div className="mt-1 space-y-2">
                  <div className="flex space-x-2">
                    <Button type="button" variant="outline" size="icon" onClick={handleBoldClick}>
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" onClick={handleItalicClick}>
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" onClick={handleUnderlineClick}>
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" onClick={handleListClick}>
                      <List className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" onClick={handleImageClick}>
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onSelect={(e) => handleSelection(e.target as HTMLTextAreaElement)}
                    onInput={(e) => auto_grow(e.target as HTMLTextAreaElement)}
                    className="text-base text-black"
                    placeholder="Пишите здесь..."
                    rows={10}
                    ref={textareaRef}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between my-4">
          <Button className="text-white w-full bg-[#E02A26] p-4 rounded-3xl text-nowrap max-w-max " variant="outline">Сохранить</Button>
          <Button className="text-white w-full bg-black p-4 rounded-3xl text-nowrap max-w-max " type="submit" onClick={handleSubmit}>Опубликовать</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="preview" className="w-full max-w-96">
        <h1 className="text-gray-500 text-4xl">Предпросмотр</h1>
        <TabsContent value="preview">
          <Card>
            <CardContent className="p-4">
              <h1 className="text-3xl mb-4">{title}</h1>
              <ReactMarkdown className="break-all whitespace-normal">{content.replace(/\n/g, "  \n")}</ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}