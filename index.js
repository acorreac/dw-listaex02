//const db = require("./db");

(async()=>{
    const db = require("./db");
    console.log('Começou!');

    const connect = await db.connect();

    console.log('INSERT CLIENTES');
    await db.insertCustomer({nome: "Arthur", idade:18, uf:"SP"});
    await db.insertCustomer({nome: "Pedro", idade:15, uf:"SP"});
    await db.insertCustomer({nome: "João", idade:17, uf:"MG"});
    await db.insertCustomer({nome: "Maria", idade:18, uf:"SP"});
    await db.insertCustomer({nome: "Sophia", idade:14, uf:"BH"});
    await db.insertCustomer({nome: "Jennifer", idade:20, uf:"RJ"});
    await db.insertCustomer({nome: "Cris", idade:19, uf:"RS"});
    //console.log(result);

    console.log('SELECT * FROM CLIENTES');
    const clientes = await db.selectCustomers();
    console.log(clientes);

    console.log('UPDATE CLIENTES');
    const result2 = await db.updateCustomer(2, {nome: "Zé José", idade: 19, uf: "SP"});
    console.log(result2);

    console.log('SELECT * FROM CLIENTES');
    const clientes2 = await db.selectCustomers();
    console.log(clientes2);

    console.log('DELETE FROM CLIENTES');
    const result3 = await db.deleteCustomer(4);
    console.log(result3);

    console.log('SELECT * FROM CLIENTES');
    const clientes3 = await db.selectCustomers();
    console.log(clientes3);

})();

