import {
  useEffect,
  useState,
} from 'react';

import { useAtom } from 'jotai';

import { isLoggedInAtom } from '../../../App';
import SelectBox from '../../inputs/SelectBox';
import { ProfileImage } from '../../profileImage/ProfileImage';

type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  state: string;
  image: string;
  position: string;
  dayoff: string;
};

export default function Profile() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
      const userData = async () => {
        await fetch("http://localhost:3001/user", {
          headers: {
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((data: User[]) =>
            data.map((user) => {
              if (user.email === loggedInUserEmail) {
                setUser(user || null);
              }
            })
          )
          .catch((err) => {
            console.error(`Error : ${err}`);
          });
      };

      if (isLoggedIn) {
        userData();
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="w-[400px] p-[16px] flex flex-col justify-around gap-[16px]">
      <div className="flex justify-between">
        <h2 className="text-titleMd text-gray00 font-bold ">프로필</h2>
        <div className="flex items-center gap-[4px]">
          <p className="text-gray00">상태:</p>
          <SelectBox
            options={["온라인", "오프라인"]}
            size="md"
            selectedValue="전체"
            onSelect={() => {}}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        {<ProfileImage size="lg" isOnline={true} />}
      </div>
      <div className="flex flex-col items-center gap-[5px]">
        <p className="text-gray01">{user?.position}</p>
        <p className="text-gray00 text-titleMd">{user?.name}</p>
        <p className="text-gray01 text-lg">{user?.email}</p>
      </div>
    </div>
  );
}
