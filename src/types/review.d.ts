export type T_Review = {
  id: string;
  type: string;
  ratings: number;
  description: string;
};

export type T_Service_Review = {
  _id: string;
  serviceId: {
    _id: string;
    name: string;
    providerId: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  };
  userId: {
    _id: string;
  };
  __v: number;
  comment: string;
  createdAt: string;
  rating: number;
  updatedAt: string;
};
