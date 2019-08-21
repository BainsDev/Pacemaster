import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

const createTB = () => {
    db.transaction(function(txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
          [],
          function(tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS users', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), email VARCHAR(255), pass VARCHAR(255))',
                []
              );
            }
          }
        );
    });
}

const signUp = (credential, onSuccess, onFailed) => {
    const name = credential.name;
    const email = credential.email;
    const pass = credential.pass;

    console.log(credential);
    db.transaction(function(tx) {
        tx.executeSql(
          'INSERT INTO users (name, email, pass) VALUES (?,?,?)',
          [name, email, pass],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              //alert("Success");
              onSuccess();
            } else {
              //alert("failed");
              onFailed();
            }
          }
        );
    });
};


const login = (credential, onSuccess, onFailed) => {
    const email = credential.email;
    const pass = credential.pass;
    console.log(":" + email  + " : " + pass);
    //alert(credential);
    console.log(db);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users where email = ? and pass = ?',
        [email, pass],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            //alert("Success");
            global.user = results.rows.item(0).name;
            // console.log(results.rows.item(0).name);
            // console.log(results.rows.item(0).pass);
            // console.log(results.rows.item(0).email);
            // console.log(results.rows.item(0).id);
            //console.log(global.user);
            onSuccess();
          } else {
            //alert("failed");
            onFailed();
          }
        }
      );
    });
};

export {createTB, login, signUp};