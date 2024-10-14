
import {useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";


async function getNews() {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/', {
        method: "GET"
    })
    return response.json();
}

async function addNews(id: number, title: string, text_md: string, fileInput: any, queryClient: any) {
    let fd = new FormData();
    let body = {
        "title": title,
        "text_md": text_md
    }
    // console.log(fileInput.current.value !== "")
    if(fileInput.current.value !== ''){
        fd.append("file", fileInput.current.files[0]);
        let logo_response = await (await fetch(process.env.NEXT_PUBLIC_API_URL + '/resources/', {
            method: "POST",
            body: fd,
            credentials: "include"
        })).json()
        // console.log(logo_response.id)
        // @ts-ignore
        body["media"] = [logo_response.id]
    }
    let url = process.env.NEXT_PUBLIC_API_URL + '/posts/'

    if(id !== -1){
        url += + id + "/"
    }
    console.log(url)
    console.log(body)
    let response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    queryClient.invalidateQueries({queryKey: ["news"]})
    return response.json();
}

async function deletePost(id: number, queryClient: any) {
    let response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts/' + id + "/", {
        method: "DELETE"
    })
    queryClient.invalidateQueries({queryKey: ["news"]})
    return response.json();
}


function News(props: { post: any }) {
    let queryClient = useQueryClient();
    let post = props.post;
    const [title, setTitle] = useState(post ? post.title : "Заголовок")
    const [text_md, setTextMd] = useState(post ? post.text_md : "Текст")
    const fileInput = React.useRef<HTMLInputElement>(null);

    let id = post ? post.id : null;
    return (
        <div className="rounded border p-2 flex flex-wrap gap-2">
            <input className="w-32 px-2 h-10 border rounded" defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea style={{resize:"none"}} className="focus:w-full h-10 focus:h-96 duration-300 p-2 border rounded" defaultValue={text_md} onChange={(e) => setTextMd(e.target.value)}/>
            <img src={process.env.NEXT_PUBLIC_API_URL +"/" + (post ? post.media[0].filename : '')} className=" aspect-square mx-10 max-w-10 w-10 p-1" alt="" />
            <input type="file" name="file" className="my-auto hover:file:bg-black file:duration-100 hover:file:text-white file:py-2 file:bg-white file:border file:rounded " ref={fileInput} />
            {post === null &&
                <button className="border border-black hover:text-white hover:bg-black px-2 duration-100 rounded"
                        onClick={() => {
                            addNews(-1, title, text_md, fileInput, queryClient);


                        }}>Добавить новость</button>}
            {post !== null &&<>
                <button className="border border-black hover:text-white hover:bg-black px-2 duration-100 rounded"
                        onClick={() => {
                            addNews(id, title, text_md, fileInput, queryClient)
                            queryClient.invalidateQueries({queryKey: ["news"]})
                        }}>Изменить новость</button>
                <button className="border border-black hover:text-white hover:bg-black px-2 duration-100 rounded"
                        onClick={() => {
                            deletePost(id, queryClient)
                            queryClient.invalidateQueries({queryKey: ["news"]})
                        }}>X</button></>}

        </div>
    )
}


export default function Edit_news() {
    const {data, status} = useQuery({
        queryKey: ['news'],
        queryFn: getNews
    })
    return (
        <div className="bg-white w-full gap-4 text-black">
            <h1 className="text-2xl font-bold flex flex-row">Новости</h1>
            {status === 'error' && <p>{status}</p>}
            <News post={null} />
            {status === 'pending' &&
                <p style={{margin: "auto", display: "block", width: "max-content"}}>{status}</p>}
            {status === "success" && data.map((post: any) =>
                <News post={post} key={post.id}/>
            )}
        </div>
    )
}
