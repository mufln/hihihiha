import Active from "@/components/titles/active-player"
import  '../../../styles/tbody.css'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import StatTitle from "@/components/titles/statistics"


const backgroundImage = 'url(https://avatars.mds.yandex.net/get-shedevrum/5570741/img_b5b38b9886fd11efb424c6eb7d220bbe/orig)'
const biograhpy =`Лукас Томпсон начал свою профессиональную карьеру в юношеской академии "Манчестер Юнайтед" в возрасте 8 лет. Он быстро продвигался по служебной лестнице, впечатляя тренеров своей скоростью, ловкостью и мастерством на добивании. В 2013 году он дебютировал на профессиональном уровне за "Манчестер Юнайтед" в матче Лиги чемпионов против мадридского "Реала".
В 2016 году Томпсон перешел в "Пари Сен-Жермен" за рекордную сумму в 60 миллионов евро. За три года работы в "ПСЖ" он выиграл два титула чемпиона Лиги 1, один Кубок Франции и один Кубок Лиги чемпионов. Он также сформировал смертоносное атакующее трио с Неймаром и Килианом Мбаппе, получив прозвище "Лев" за свою бесстрашную и доминирующую игру на поле.
В 2019 году Томпсон вернулся в Премьер-лигу, подписав контракт с "Ливерпулем" за 80 миллионов евро. С тех пор он стал любимцем болельщиков "Энфилда", известный своей неустанной работой, исключительным видением и способностью забивать решающие голы в важных матчах.`
const items = [
  { id: 1, title: "Игры", value: 24 },
  { id: 2, title: "Голы", value: 57 },
  { id: 3, title: "Передачи", value: 11 },
  { id: 4, title: "ЖК", value: 3 },
  { id: 5, title: "КК", value: 1 },
]

export default function Player() {
  const tableData = Array.from({ length: 7 }, (_, rowIndex) =>
    Array.from({ length: 7 }, (_, colIndex) => `${rowIndex + 1}-${colIndex + 1}`)
  )
  return (
    <div className="h-full bg-white flex flex-wrap text-black p-4">
      <div className="flex flex-col mb-8">
          <div className="flex flex-wrap space-x-4">
            <div className='preview mb-4' key={items.id} style={{backgroundImage: backgroundImage}}></div>
            <div className="flex-1">
              <div className="mb-4">
                  <h2 className="text-4xl">Иван Иванов</h2>
                  <Active/>
              </div>
              <p className="mt-1 text-xl">Нападающий</p>
            </div>
          </div>
          <div className=" flex mt-4 bg-black text-white rounded-2xl p-2 max-w-max">
          {items.map((item, index) => (
            <div className='col m-2' key={index}>
              <div className="text-base text-center m-2">
                  {item.title}
              </div>
              <div className="text-lg font-bold text-center m-2">
                  {item.value}
              </div>
            </div>
          ))}
          </div>
      </div>
      <div className=" flex flex-col max-w-max text-gray-500 px-6">
        <h2 className="text-4xl">Биография</h2>
        <p className="my-2 max-w-3xl text-justify indent-4">{biograhpy}</p>
      </div>
      <div className="container flex flex-col mx-auto  mt-8">
        <StatTitle/>
        <Table className="my-4 rounded-lg overflow-hidden border-2 border-black">
          <TableHeader className="">
            <TableRow className="">
              {["", "", "И", "Г", "ПАС.", "ЖК", "КК"].map((item, index) => (
                <TableHead key={index} className="p-4 text-center border-2 border-black">
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} className="text-center border-2 border-black">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}