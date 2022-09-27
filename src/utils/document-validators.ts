export const isRGValid = (rg: string) => {
  const rgx = /^([0-9]{2}.?)([0-9]{2,3}.?)([0-9]{3}-?)([A-Za-z0-9]{1})$/;
  return rgx.test(rg);
};

export const isCPFValid = (cpf: string) => {
  const rgx = /^([0-9]{2}.?)([0-9]{2,3}.?)([0-9]{3}-?)([A-Za-z0-9]{1})$/;
  return rgx.test(cpf);
};

export const isCNHValid = (cnh: string) => {
  const rgx = /\d{9}/;
  return rgx.test(cnh);
};

export const isCNPJValid = (cnpj: string) => {
  const rgx = /^([0-9]{2}\.?)([0-9]{3}\.?)([0-9]{3}\/?)([0-9]{4}-?)([0-9]{2})$/;
  return rgx.test(cnpj);
};
