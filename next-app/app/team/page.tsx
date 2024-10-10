import './tbody.css';
import React from 'react';
import TeamTitle from '@/components/titles/team';

function Body() {
  const previewData = [
    {
      title: 'Иван Иванов',
      desc: 'Вратарь',
      backgrounndImage: 'url(https://img.freepik.com/free-photo/young-attractive-football-player_144627-5781.jpg?t=st=1728554882~exp=1728558482~hmac=bef19a7411506bce5ebdfe6775cadee6ea8258218c318c67f0bd6f9d83a88a15&w=900)'
    },
    {
      title: 'Петр Петров',
      desc: 'Защитник',
      backgrounndImage: 'url(https://img.freepik.com/free-photo/young-sportsman-posing-near-soccer-ball_23-2147820696.jpg?t=st=1728554963~exp=1728558563~hmac=0570e41138ed949f4bc894f8f63b6a669d1e803c07b3ff18519d8968a4985497&w=900)'
    },
    {
      title: 'Александр Александров',
      desc: 'Нападающий',
      backgrounndImage: 'url(https://img.freepik.com/free-photo/soccer-player-with-ball-standing-knee-play-football_176420-16453.jpg?t=st=1728555008~exp=1728558608~hmac=3a86375a2a0f0c2465597de0479b3f3db7a5a1708f3165251af28adfab658896&w=900)'
    },
    {
      title: 'Александр Александров',
      desc: 'Нападающий',
      backgrounndImage: 'url(https://img.freepik.com/free-photo/soccer-player-with-ball-standing-knee-play-football_176420-16453.jpg?t=st=1728555008~exp=1728558608~hmac=3a86375a2a0f0c2465597de0479b3f3db7a5a1708f3165251af28adfab658896&w=900)'
    },
    {
      title: 'Александр Александров',
      desc: 'Нападающий',
      backgrounndImage: 'url(https://img.freepik.com/free-photo/soccer-player-with-ball-standing-knee-play-football_176420-16453.jpg?t=st=1728555008~exp=1728558608~hmac=3a86375a2a0f0c2465597de0479b3f3db7a5a1708f3165251af28adfab658896&w=900)'
    },
    {
      title: 'Александр Александров',
      desc: 'Нападающий',
      backgrounndImage: 'url(https://img.freepik.com/free-photo/soccer-player-with-ball-standing-knee-play-football_176420-16453.jpg?t=st=1728555008~exp=1728558608~hmac=3a86375a2a0f0c2465597de0479b3f3db7a5a1708f3165251af28adfab658896&w=900)'
    }
    
  ]

  return (
    <div  className='Body bg-white p-10 w-full'>
    <TeamTitle/>

    <div className="containerNews my-10">
    {previewData.map((item, index) => (
          <div className='preview' key={index} style={{backgroundImage: item.backgrounndImage}}>
            <div className='previewText'>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
    </div>
    </div>
  )
}

export default Body;
