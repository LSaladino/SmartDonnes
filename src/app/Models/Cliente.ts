export class Cliente {

    constructor() {
        this.id = 0;
        this.razaoSocial = "";
        this.pessoaContato = "";
        this.cnpj = "";
        // this.dataCliente
    }

    id: number = 0;
    razaoSocial?: string;
    pessoaContato?: string;
    cnpj?: string;
    dataCliente?: Date;

}