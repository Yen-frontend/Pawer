import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PetList({ nowPageItems }) {

  return (
    <>
      {nowPageItems.map((v) => (
        <Link
          key={v.ID}
          className="col-lg-4 col-6 no-underline g-1 g-sm-4"
          href={`/communicator/${v.ID}`}
          passHref
        >
          <div className="pet-teachercard-yen position-relative m-3" key={v.ID}>
            {/* 頭像 */}
            <Image
              className="imgg"
              src={`http://localhost:3005/pet/${v.Img}`}
              alt="1"
              width={400}
              height={400}
            />
            {/* 外部 */}
            <div className="contain">
              <h4>{v.Name}</h4>
              <p className="text">
                證書編號：
                <br />
                {v.Certificateid}
              </p>
              <p className="text">
                通過日期：
                <br />
                {v.CertificateDate}
              </p>
              <p className="hover-btn">我要預約</p>
            </div>
            {/* hover效果 */}
            <div className="contain-hover">
              <p className="text-center f">Hi, 我是{v.Name}</p>
              <div className="">
                <p>
                  服務項目：
                  <br />
                  {v.Service}
                </p>
                <p className="">
                  進行方式：
                  <br />
                  {v.Approach}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}

    </>
  );
}