import React, { useState, useEffect } from 'react';
import { PageNav } from '@/components/PageNav';
import { usePagination } from '@/hooks/usePagination';
import MemberLayout from '@/components/layout/member-layout';
import PageTitle from '@/components/member/page-title/page-title';
import ProductList from '@/components/product/list/productList';
import Link from 'next/link';
import Head from 'next/head';

import MemberNav from '@/components/memberNav';

Index.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};

export default function Index() {
  const [url, setUrl] = useState(
    'http://localhost:3005/api/product/member/favorite'
  );

  // setUrl 第一層在父層 帶下去商品卡片頁第二層子層

  const {
    newdata,
    needFilter,
    nowPageItems,
    nowPage,
    totalPage,
    next,
    prev,
    chooseFilter,
  } = usePagination({
    url: url,
    needFilter: [{ id: 1, label: '已收藏' }],
  });
  return (
    <>
      <Head>
        <title>會員中心 - 收藏商品</title> {/* 設置當前頁面的標題 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="productList">
        <div className="card-favorite d-flex justify-content-between">
          <PageTitle title={'收藏商品'} subTitle={'Favorite'} />
          <MemberNav
            newdata={newdata}
            chooseFilter={chooseFilter}
            needFilter={needFilter}
          />
        </div>

        <div className="card mt-3 p-4">
          {nowPageItems.length === 0 ? (
            <>
              <p className="mt-2">您沒有收藏的商品</p>
              <div>
                <Link
                  href="/product"
                  className="pet-choose-status no-underline"
                >
                  去逛逛
                </Link>
              </div>
            </>
          ) : (
            <div className="row ms-4 d-flex justify-content-start card-favorite-list">
              {nowPageItems.map((pd) => (
                <ProductList key={pd.id} pd={pd} setUrl={setUrl} />
              ))}
            </div>
          )}
          {/* 頁碼 */}
          <div className="d-flex justify-content-center align-items-center mt-3">
            {nowPageItems.length === 0 ? (
              <div></div>
            ) : (
              <PageNav
                nowPage={nowPage}
                totalPage={totalPage}
                next={next}
                prev={prev}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
