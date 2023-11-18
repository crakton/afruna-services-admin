export interface IUserBio {
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
}

export interface IConversation {
  _id: string;
  recipients: string[];
  lastMessage: string;
  alias: string;
  aliasAvatar?: string | undefined; // Changed to allow 'undefined'
  unreadMessages: number;
  createdAt: string;
  updatedAt: string;
}
export interface IMessage {
  conversation: string;
  to: IUserBio;
  from: IUserBio;
  message: string;
  attachment: [];
  seen: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISendingMessage {
  convo: IConversation;
  message: IMessage;
}
