const mysql = require('mysql2/promise');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

const connectdb = await mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : '',
    password : ''
});

console.log('Conectou no MySQL!');

connectdb.query('CREATE DATABASE IF NOT EXISTS crud;');
console.log('Criou database crud!');

connectdb.query('use crud;');

connectdb.query('CREATE TABLE IF NOT EXISTS clientes (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(255) NOT NULL, idade INT NOT NULL, uf VARCHAR(20) NOT NULL, PRIMARY KEY(id))');
console.log('Criou tabela clientes!');

global.connection = connectdb;
return global.connection;
}

async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome, idade, uf) VALUES(?,?,?);';
    const values = [customer.nome, customer.idade, customer.uf];
    await conn.query(sql, values);
    const [result] = await conn.query('SELECT * FROM clientes WHERE id = (SELECT LAST_INSERT_ID())');
    return result; 
}

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes;');
    return rows;
}

async function updateCustomer(id, customer){
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?;';
    const values = [customer.nome, customer.idade, customer.uf, id];
    await conn.query(sql, values);
    const [update] = await conn.query('SELECT * FROM clientes WHERE id = 2');
    return update;
}

async function deleteCustomer(id){
    const conn = await connect();
    const sql = 'DELETE FROM clientes where id=?;';
    await conn.query(sql, [id]);
    return 'id: ' + id + ' Deletado com sucesso!';
}

module.exports = {connect, insertCustomer, selectCustomers, updateCustomer, deleteCustomer}
