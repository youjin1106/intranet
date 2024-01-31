import logo from '../../assets/logo.svg';
import PrimaryButton from '../buttons/PrimaryButton';
import InputBox from './InputBox';

export default function LoginForm() {
   return (
      <div className="w-[484px] h-[432px] bg-white p-10 rounded flex flex-col justify-around gap-[64px]">
         <h1 className="logo">
            <img src={logo} alt="logo" />
         </h1>
         <div className='flex flex-col gap-[16px]'>
            <InputBox label={'아이디'}/>
            <InputBox label={'비밀번호'}/>
         </div>
        <PrimaryButton label={'로그인'} size={'lg'} />
      </div>
   );
}
