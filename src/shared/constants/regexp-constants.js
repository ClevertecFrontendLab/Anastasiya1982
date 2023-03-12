export const authRegexp = {
  email: new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/),
  phone: new RegExp(/^(\+375)\s\((29|25|44|33)\)\s(\d{3})[-](\d{2})[-](\d{2})$/),
  latinLetter: new RegExp(/^.*((?=.*[a-zA-Z]){1}).*$/),
  numberRequired: new RegExp(/^.*((?=.*[0-9]){1}).*$/),
  oneCapitalLetter: new RegExp(/^.*((?=.*[А-ЯA-Z]){1}).*$/),
};
