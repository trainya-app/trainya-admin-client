export function formatRG(rg: string) {
  return rg
    .replace(/\D/g, '')
    .replace(
      /^([0-9]{2})\.?([0-9]{3})\.?([0-9]{3}-?)([A-Za-z0-9]{1})$/,
      '$1.$2.$3-$4'
    );
}

export function formatCPF(cpf: string) {
  return cpf
    .replace(/\D/g, '')
    .replace(
      /^([0-9]{3}\.?)([0-9]{3}\.?)([0-9]{3}\/?)([A-Za-z0-9]{2})$/,
      '$1.$2.$3-$4'
    );
}

export function formatCNPJ(cnpj: string) {
  return cnpj
    .replace(/\D/g, '')
    .replace(
      /^([0-9]{2}\.?)([0-9]{3}\.?)([0-9]{3}\/?)([0-9]{4}-?)([0-9]{2})$/,
      '$1.$2.$3/$4-$5'
    );
}
