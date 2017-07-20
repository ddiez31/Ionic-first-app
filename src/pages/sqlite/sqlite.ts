import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'data.db';

@Component({
    selector: 'page-sqlite',
    templateUrl: 'sqlite.html'
})

export class SQLitePage {

    private db: SQLiteObject;
    titleMovie: string;
    ratingMovie: number;
    descriptionMovie: string;
    categoryMovie: string;

    constructor(public navCtrl: NavController, private sqlite: SQLite) {
        this.CreateDatabaseFile();
    }

    private CreateDatabaseFile(): void {
        this.sqlite.create({
            name: DATABASE_FILE_NAME,
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                console.log('BDD créée');
                this.db = db;
                this.CreateTables();
            })
            .catch(e => console.log(e));
    }

    private CreateTables(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `movies` ( `idMovies` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `name` TEXT NOT NULL, `eval` INTEGER NOT NULL DEFAULT 3, `desc` TEXT, `categoryid` INTEGER NOT NULL, FOREIGN KEY(`categoryid`) REFERENCES `idCategories` )', {})
            .then(() => {
                console.log('Table movies créée');
                this.db.executeSql('CREATE TABLE IF NOT EXISTS `categories` ( `idCategories` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `name` TEXT NOT NULL )', {})
                    .then(() => console.log('Table categories créée'))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    public saveMyFile() {
        console.log('Titre: ' + this.titleMovie);
        console.log('Evaluation: ' + this.ratingMovie);
        console.log('Description: ' + this.descriptionMovie);
        console.log('Catégorie: ' + this.categoryMovie);

        // INSERT INTO 'categories' (name) VALUES ('test');
        // INSERT INTO 'movies' (name, eval, desc, categoryid) VALUES ('film', 3, 'test', 1);

    }
}