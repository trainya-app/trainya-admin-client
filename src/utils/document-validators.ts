export const isRGValid = (rg: string) => {
  const rgx = /^([0-9]{2}.?)([0-9]{2,3}.?)([0-9]{3}-?)([A-Za-z0-9]{1})$/;
  return rgx.test(rg);
};

export const isCPFValid = (cpfStr: string) => {
  const cpf = cpfStr.replace(/\D/g, '');

  let soma;
  let resto;
  soma = 0;
  if (cpf === '00000000000') return false;

  for (let i = 1; i <= 9; i += 1)
    soma += Number(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i += 1)
    soma += Number(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number(cpf.substring(10, 11))) return false;
  return true;
};

export const isCNHValid = (cnh: string) => {
  const rgx = /\d{9}/;
  return rgx.test(cnh);
};

export const isCNPJValid = (cnpj: string) => {
  const rgx = /^([0-9]{2}\.?)([0-9]{3}\.?)([0-9]{3}\/?)([0-9]{4}-?)([0-9]{2})$/;
  return rgx.test(cnpj);
};
