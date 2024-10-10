// import './header.css';
import Link from 'next/link';
// import Image from 'next/image';

const items = [
  { id: 1, title: "Новости", rout: "/news" },
  { id: 2, title: "Командa", rout: "/team" },
  { id: 3, title: "Матчи", rout: "/image.png" },
  { id: 4, title: "Магазин", rout: "/image.png" },
  { id: 5, title: "О Клубе", rout: "/about" },
  { id: 6, title: "Контакты", rout: "/image.png" },
  { id: 7, title: "Профиль", rout: "/image.png" },
]

function Header() {
  return (
    <div className="Header">
        <Link key='0' href='/' className='container'>
            <img src="/kokocgroup_logo_horizontal_black_background.jpg" alt="logo" width={300} height={100}/>
        </Link>
        <div className='menu'>
          {items.map((item) => (
              <Link className='button' key={item.id} href={item.rout}>{item.title}</Link>
            ))}
        </div>
    </div>
  );
}

export default Header;