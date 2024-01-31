type TitleProps = {
  label:string
}

export default function Header({label} : TitleProps) {

  return (
    <header className='p-[16px] flex justify-between'>
      <h1 className='text-titleLg font-bold text-gray00'>{label}</h1>
      <div>
        <p className='text-lg font-medium'>오후 3:00:00</p>
        <span className='text-s text-gray01'>2024년 1월 25일 목요일</span>
      </div>
    </header>
  );
}

