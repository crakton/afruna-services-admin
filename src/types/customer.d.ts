export interface ICustomerBio {
  id: number;
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  country: string;
  phoneNumber: string;
  email: string;
  password: string;
  verificationToken: string;
  isVendor: boolean;
  isProvider: boolean;
  fromOauth: boolean;
  blocked: boolean;
  isFollowing: null;
  isFollower: null;
  addresses: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  online: boolean;
  bookings: number;
}

export interface ICustomerCard {
  totalSales: number;
  totalWithdrawal: number;
  totalServices: number;
}
