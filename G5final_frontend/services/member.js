import axiosInstance from './axios-instance';

//  修改會員一般資料用(排除password, username, email)
export const updateProfile = async (memberId = 0, user = {}) => {
  return await axiosInstance.put(`/member/profile/${memberId}`, user);
};

// 修改會員頭像用，需要用FormData
export const updateProfileAvatar = async (formData) => {
  return await axiosInstance.post(`/member/upload-avatar`, formData);
};

export const register = async (user = {}) => {
  return await axiosInstance.post('/member', user);
};

export const getOrdersByUser = async (memberId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/orders`);
};

export const getOrder = async (memberId = 0, orderId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/order/${orderId}`);
};

export const getCouponsByUser = async (memberId = 0) => {
  return await axiosInstance.get(`/member/${memberId}/coupons`);
};

// Google Login(Firebase)登入用，providerData為登入後得到的資料
export const googleLogin = async (providerData = {}) => {
  return await axiosInstance.post('/google-login', providerData);
};

// 解析accessToken用的函式
export const parseJwt = (token) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
};
