"use client";
import ProfileAvatar from "./profile-menu";
export default function HeaderMenuRight() {

  return (
    <div className="ms-auto w-full flex justify-end items-center gap-2 text-gray-700 xs:gap-3 xl:gap-5">
      <div className="px-3">
        <ProfileAvatar />
      </div>
    </div>
  );
}
