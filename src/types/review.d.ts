export type T_Service_Review = {
  id: number;
  _id: string;
  serviceId: {
    _id: string;
    name: string;
    providerId: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  __v: number;
  comment: string;
  createdAt: string;
  rating: number;
  updatedAt: string;
};
