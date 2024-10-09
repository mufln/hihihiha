import './header.css';
// import Image from 'next/image';

function Header() {
  return (
    <div className="Header">
        <div className='container'>
            <img src="/kokocgroup_logo_horizontal_black_background.jpg" alt="logo" width={300} height={100}/>
        </div>
        <div className='menu my-10'>
          {[["Новости", "Команды", "Матчи", "Магазин", "О Клубе", "Контакты", "Профиль"].map((item) => (
              <button>{item}</button>
            ))]}
        </div>
    </div>
  );
}

export default Header;