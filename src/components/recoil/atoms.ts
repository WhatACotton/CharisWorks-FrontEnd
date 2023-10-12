import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: 'notlogin',
});

export const UserIDStore = atom({
key: 'UserID',
default: '',
});
export const ContactStore= atom({
key: 'Contact',
default: '',
});
export const NameStore= atom({
key: 'Name',
default: '',
});
export const ZipCodeStore= atom({
key: 'ZipCode',
default: '',
});
export const AddressStore = atom({
key: 'Address',
default: '',
});
export const CreatedDateStore= atom({
key: 'CreatedDate',
default: '',
});
export const EmailVerifiedStore= atom({
key: 'EmailVerified',
default: '',
});
export const RegisteredStore= atom({
key: 'Registered',
default: '',
});
