/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/components/product/favorite/FavoriteIcon/FavoriteIcon.module.scss';
import { useAuth } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import Image from 'next/image';
import logo from 'public/LOGO.svg';

const IconToggle = ({ iconStatus, IconFilled, IconOutline, setUrl }) =>
  iconStatus ? <IconFilled /> : <IconOutline />;
// 這是活動的
export default function FavoriteIcon({
  IconFilled,
  IconOutline,
  count,
  data,
  nowPageItems,
  setUrl,
}) {
  const { auth } = useAuth();
  const id = auth.memberData.id;
  const [iconStatus, setIconStatus] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);
  const router = useRouter();

  const islogin = () => {
    if (auth.isAuth) {
      router.push(`/`);
    } else {
      router.push(`/member/login`);
    }
  };

  const CountIcon = () => {
    if (!id) {
      toast('您需要登入才能收藏', {
        duration: 1800,
        style: {
          borderRadius: '10px',
          borderTop: '15px #22355C solid',
          background: '#F5F5F5',
          color: '#646464',
          marginTop: '80px',
          width: '240px',
          height: '80px',
        },
      });
      return;
    }

    const addFv = async () => {
      console.log({ joininId: data, memberId: id });
      try {
        const response = await fetch(
          'http://localhost:3005/api/join-in/favorite',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', // 變字串
            },
            body: JSON.stringify({ joininId: data, memberId: id }),
          }
        );
        if (!response.ok) throw new Error('加入收藏失敗');
        const result = await response.json();
        console.log('加入收藏成功', result);
        setCurrentCount((prevCount) => prevCount + 1); // 更新計數
      } catch (error) {
        console.error(error);
        toast.error('新增收藏時發生錯誤');
      }
    };

    const delFv = async () => {
      console.log({ joininId: data, memberId: id });
      try {
        const response = await fetch(
          'http://localhost:3005/api/join-in/favorite',
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json', // 設置 Content-Type
            },
            body: JSON.stringify({ joininId: data, memberId: id }),
          }
        );
        if (!response.ok) throw new Error('取消收藏失敗');
        const result = await response.json();
        console.log('取消收藏成功', result);
        setCurrentCount((prevCount) => prevCount - 1); // 更新計數
      } catch (error) {
        console.error(error);
        toast.error('刪除收藏時發生錯誤');
      }
    };

    setIconStatus((prevStatus) => {
      const newStatus = !prevStatus;
      if (newStatus) {
        addFv();
        toast('收藏成功', {
          // icon: "",
          duration: 1800,
          style: {
            borderRadius: '10px',
            borderTop: '15px #22355C solid',
            background: '#F5F5F5',
            color: '#646464',
            marginTop: '80px',
            width: '220px',
            height: '70px',
          },
        });
      } else {
        delFv();
        toast('取消收藏', {
          // icon: '',
          duration: 1800,
          style: {
            borderRadius: '10px',
            borderTop: '15px #646464 solid',
            background: '#F5F5F5',
            color: '#646464',
            marginTop: '80px',
            width: '220px',
            height: '70px',
          },
        });
      }

      return newStatus;
    });
  };

  useEffect(() => {
    setCurrentCount(count);
  }, [count]);

  useEffect(() => {
    // 檢查該商品是否已被收藏
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/join-in/favorite?memberId=${id}&joininId=${data}`
        );
        if (!response.ok) throw new Error('無法確認收藏狀態');
        const result = await response.json();
        setIconStatus(result.isFavorite); // 根據回傳值設定收藏狀態
      } catch (error) {
        console.error('檢查收藏狀態時發生錯誤', error);
      }
    };

    if (id) {
      checkFavoriteStatus();
    }
  }, [id, data]); // 當 id 或商品 ID 發生變化時重新檢查

  return (
    <div className={styles['click-icon']}>
      <div type="button" className={styles['icon-btn']} onClick={CountIcon}>
        <IconToggle
          setUrl={setUrl}
          iconStatus={iconStatus}
          IconFilled={IconFilled}
          IconOutline={IconOutline}
        />
      </div>
      <span>
        {currentCount ||
          (count && <span className={styles['count']}>{currentCount}</span>)}
      </span>
    </div>
  );
}
