// ヘッダーメニューの切り替えボタン、メニュー
"use client";

import { useEffect, useState } from "react";
import { FaFolder, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import FolderMenu from "./FolderMenu";
import SearchMenu from "./SearchMenu";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

const HeaderNav = () => {
  // ボタンクリックで表示するメニュー切替
  const [switchMenu, setSwitchMenu] = useState("folder");

  // スマホ表示であるかを判定
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateIsMobile = () => {
      // 画面幅768px未満の場合SP表示と判定
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handleSwitch = (id: string) => {
    if (isMobile && switchMenu === id) {
      // SP表示かつ同じメニューのボタンをクリックした場合
      // クリックしたメニューが既に開いている場合は閉じる（トグル）
      setSwitchMenu("");
    } else {
      // PC表示はトグルせずメニューを切り替える
      setSwitchMenu(id);
    }
  };

  return (
    <div className="h-full flex p-4 gap-4">
      <div className="text-4xl">
        <nav>
          <ul className="flex md:flex-col gap-3 md:gap-5 ">
            <li
              className={` rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "folder" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button onClick={() => handleSwitch("folder")} className="p-2">
                <FaFolder className="text-3xl" />
              </button>
            </li>
            <li
              className={`rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "search" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button onClick={() => handleSwitch("search")} className="p-2">
                <FaSearch className="text-3xl" />
              </button>
            </li>
            <li
              className={`rounded-md hover:bg-slate-100 hover:text-gray-500 duration-100 ${
                switchMenu === "profile" ? "bg-slate-100 text-gray-500" : "text-white"
              }`}
            >
              <button onClick={() => handleSwitch("profile")} className="p-2">
                <FaRegUserCircle className="text-3xl" />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* md:min-w-[300px] フォルダメニュー作成後に調整 */}
      <div className="w-full md:pl-4 absolute md:static left-0 top-full bg-gray-300 md:bg-transparent md:border-l-2 border-white z-20 md:min-w-[300px]">
        <div className={`${switchMenu === "folder" ? "block" : "hidden"}`}>
          <FolderMenu />
        </div>
        <div className={`${switchMenu === "search" ? "block" : "hidden"}`}>
          <SearchMenu />
        </div>
        <div className={`${switchMenu === "profile" ? "block" : "hidden"}`}>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};
export default HeaderNav;
