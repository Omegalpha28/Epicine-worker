const mysql = require("mysql2");
const { error, logs } = require("../../utils/Logger");
let client = {};

const sqlType = {
    String: "String",
    Number: "Number",
    Boolean: "Boolean",
    Date: "Date",
    Object: "Object",
    Array: "Array",
    Now: "Now",
    Float: "Float",
    Text: "Text"
};

const sqlTypeMap = {
    String: 'VARCHAR',
    Number: 'INT',
    Boolean: 'BOOLEAN',
    Date: 'DATETIME',
    Object: 'JSON',
    Array: 'VARCHAR',
    Now: 'NOW()',
    Float: 'FLOAT',
    Text: 'TEXT'
};

/**
 * Represents a database schema.
 * 
 * @example
 * const transferSchema = new Schema({
 *     token: {
 *         type: String,
 *         length: 50
 *     },
 *     mdp: {
 *         type: String,
 *         length: 15
 *     }
 * });
 */
class Schema {
    constructor(schemaDict) {
        this.schemaDict = schemaDict;
    }
}

let connexion = null;

/**
 * Establishes a connection to the database using a given configuration.
 * @param {Object} config Database connection configuration.
 * @param {string} config.host The database host.
 * @param {number} config.port The database port.
 * @param {string} config.user The username for the connection.
 * @param {string} config.password The password for the connection.
 * @param {string} config.database The name of the database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 * 
 * @example
 * const config = {
 *   host: 'localhost',
 *   port: 6666,
 *   user: 'root',
 *   password: 'password',
 *   database: 'mydatabase'
 * };
 * await connect(config);
 */
async function connect(config) {
    connexion = mysql.createConnection(config);
}


/**
 * Closes the database connection.
 * This function terminates the active database connection and records a logging message
 * indicating whether the shutdown succeeded or failed.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is closed.
 *
 * @example
 * await logout();
 */
async function logout() {
    connexion.end(err => {
        if (err) {
            error(`Error closing database connection: ${err}`);
            return;
        }

        logs("Database connection closed");
    });
}

/**
 * Generates an SQL condition from a filter object.
 * 
 * @param {Object} filter An object containing the key-value pairs to use to generate the condition.
 * @param {boolean} [isUpdate=false] A flag to determine whether the condition is used in an update request.
 * @returns {string} A character string representing the generated SQL condition.
 * 
 * @example
 * const filter = { id: 1, name: "John" };
 * const condition = generateCondition(filter);
 * console.log(condition); // 'id = 1 AND name = "John"'
 *
 * @example
 * const filter = { id: 1, name: "John" };
 * const condition = generateCondition(filter, true);
 * console.log(condition); // 'id = 1, name = "John"'
 */
function generateCondition(filter, isUpdate = false) {
    const keys = Object.keys(filter);
    const values = Object.values(filter);

    const conditions = keys.map((key, index) => {
        const value = values[index];
        return `${key} = ${typeof value === "string" ? `"${value}"` : value}`;
    }).join(` ${isUpdate == false ? "AND" : ","} `);

    return conditions;
}

function generateValueSQL(value) {
    return value.map(item => {
        if (typeof item === "string") return `"${item.replace(/"/g, '\\"')}"`;
        if (typeof item === "object") return `"${item}"`;
        return item;
    }).join(", ");
}

/**
 * Replaces values ​​from one dictionary with those from another dictionary if the keys match.
 * @param {Object} dict The original dictionary containing the values ​​to replace.
 * @param {Object} replacementDict The dictionary containing the replacement values.
 * @returns {Object} A new dictionary with the replaced values.
 * 
 * @example
 * const dict = { a: 1, b: 2, c: 3 };
 * const replacementDict = { b: 20, c: 30 };
 * const result = replaceValues(dict, replacementDict);
 * console.log(result); // { a: 1, b: 20, c: 30 }
 */
function replaceValues(dict, replacementDict) {
    const resultDict = {};

    for (const key in dict) {
        if (key in replacementDict) resultDict[key] = replacementDict[key];
        else resultDict[key] = dict[key];
    }

    return resultDict;
}

const reservedKeywords = ['ADD', 'ALL', 'ALTER', 'AND', 'AS', 'ASC', 'BETWEEN', 'BY', 'CASE', 'CHECK', 'COLUMN', 'CONSTRAINT', 'CREATE', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'DEFAULT', 'DELETE', 'DESC', 'DISTINCT', 'DROP', 'ELSE', 'END', 'ESCAPE', 'EXCEPT', 'EXISTS', 'FOR', 'FOREIGN', 'FROM', 'FULL', 'GROUP', 'HAVING', 'IN', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JOIN', 'LEFT', 'LIKE', 'LIMIT', 'NOT', 'NULL', 'ON', 'OR', 'ORDER', 'OUTER', 'PRIMARY', 'REFERENCES', 'RIGHT', 'SELECT', 'SET', 'SOME', 'TABLE', 'THEN', 'UNION', 'UNIQUE', 'UPDATE', 'VALUES', 'WHEN', 'WHERE'];

/**
 * Checks if a table name is a reserved keyword.
 * 
 * @param {string} tableName Le nom de la table à vérifier.
 * @returns {boolean} `true` si le nom de la table est un mot-clé réservé, sinon `false`.
 * 
 * @example
 * const isReserved = ifReservedKeywords('SELECT');
 * console.log(isReserved); // true
 *
 * @example
 * const isReserved = ifReservedKeywords('myTable');
 * console.log(isReserved); // false
 */
function ifReservedKeywords(tableName) {
    if (reservedKeywords.includes(tableName.toUpperCase())) {
        return true;
    }
    return false;
}

function getFieldType(field) {
    if (typeof field === "object") {
        if (field.type.name !== undefined) return field.type.name;
        else return field.type;
    } else {
        if (field.name !== undefined) return field.name;
        else return field;
    }
}

/**
 * Represents a database model.
 * @class
 */
class Model {
    static sqlTypeMap = sqlTypeMap;
    /**
     * Creates an instance of Model.
     * @param {string} name The name of the database table.
     * @param {Object} schema The schema of the database table.
     */
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;

        connexion.query(this.generateCreateTableStatement(schema.schemaDict), (err) => {
            if (err) {
                error(`Error creating table: ${err} with table name: ${this.name}`);
                return;
            }
            logs(`La table ${this.name} a été créé`);
        });
    }

    /**
     * Generates an SQL statement to create a table based on the provided schema.
     * 
     * @param {Object} schema The schema of the database table.
     * @returns {string} A character string representing the SQL statement to create the table.
     */
    generateCreateTableStatement(schema) {
        
        const columns = Object.keys(schema).map(fieldName => {
            const field = schema[fieldName];
            let lengthDefault = 255;
            
            if (!field.type && typeof field == "object") throw new Error(`Field ${fieldName} has no type defined.`);
            
            const fieldType = getFieldType(field);

            if (field.type && typeof field == "object") {
                if (!sqlTypeMap[fieldType]) throw new Error(`Field ${fieldName} has unsupported type ${fieldType}.`);

                let columnDefinition = `${fieldName} ${sqlTypeMap[fieldType]}${sqlTypeMap[fieldType] == "VARCHAR" || sqlTypeMap[fieldType] == "INT" ? `(${field.length > 0 ? field.length : lengthDefault})` : ""}`;

                if (field.required) columnDefinition += ' NOT NULL';
                if (field.default !== undefined && field.default != null) columnDefinition += ` DEFAULT "${field.default}"`;
                if (field.default === null) columnDefinition += ` DEFAULT NULL`;
                if (field.unique) columnDefinition += ' UNIQUE';
                if (field.auto_increment) columnDefinition += ' AUTO_INCREMENT';
                if (typeof field.customize === 'string' && field.customize.length != 0) columnDefinition += ` ${field.customize}`;
                return columnDefinition;
            }

            if (!sqlTypeMap[fieldType]) throw new Error(`Field ${fieldName} has unsupported type ${field}`);

            return `${fieldName} ${sqlTypeMap[fieldType] == "VARCHAR" ? `${sqlTypeMap[fieldType]}(${lengthDefault})` : sqlTypeMap[fieldType]}`;
        });
        if (ifReservedKeywords(this.name)) {
            error("Error: Invalid table name. Please choose a different name that is not a reserved keyword in SQL");
            return;
        }
        return `CREATE TABLE IF NOT EXISTS ${this.name} (${columns.join(', ')}) ENGINE=InnoDB`;
    }

    /**
     * Saves data to the database table.
     * @param {Object} data The data to insert into the table.
     * @returns {Promise<Object>} A promise that resolves with the result of the insertion.
     * @throws {Error} Throws an error if the insert fails.
     */
    async save(data) {
        const keys = Object.keys(data);
        const sql = `INSERT INTO ${this.name} (${keys.join(', ')}) VALUES (${generateValueSQL(Object.values(data))})`;

        try {
            const result = await connexion.promise().query(sql);
            return result;
        } catch (err) {
            error(`Error inserting data into ${this.name}: ${err}`);
            throw err;
        }
    }

    /**
     * Finds a unique entry in the database table based on the filter provided.
     * @param {Object} filter An object containing the key-value pairs to use to generate the search condition.
     * @returns {Promise<ModelInstance|number>} A promise that resolves to a ModelInstance if an entry is found, otherwise 0.
     */
    async findOne(filter) {
        const sql = `SELECT * FROM ${this.name} WHERE ${generateCondition(filter)}`;

        return new Promise((resolve, reject) => {
            connexion.promise().query(sql).then((rows) => {
                if (rows.length == 0) return resolve(0);

                resolve(new ModelInstance(this.name, Object.values(rows[0])[0]));
            }).catch((err) => {
                error(`Error executing query: ${err}`);
                return;
            });
        });
    }

    /**
     * Asynchronously drops a table if it exists in the database.
     *
     * This function constructs a SQL query to drop a table with the name specified
     * by the `this.name` property. It then executes the query using a promise-based
     * approach. If the query is successful, the result is logged to the console.
     * If an error occurs during the execution of the query, an error message is logged.
     *
     * @returns {Promise<void>} A promise that resolves when the query execution is complete.
     */
    async dropTable() {
        const sql = `DROP TABLE IF EXISTS ${this.name};`;

        return new Promise((resolve, reject) => {
            connexion.promise().query(sql).then((rows) => {
                console.log(rows);
            }).catch((err) => {
                error(`Error executing query: ${err}`);
                return;
            });
        })
    }

    /**
     * Generates a unique UUID for the current model.
     *
     * This function generates a UUID using the SQL `UUID()` function and checks if the generated UUID
     * already exists in the database for the current model. If the UUID is unique, it is returned.
     * Otherwise, the function resolves to `null`.
     *
     * @returns {Promise<string|null>} A promise that resolves to a unique UUID string if successful, or `null` if an error occurs or the UUID is not unique.
     *
     * @example
     * const uuid = await model.generate_uuid();
     * if (uuid) {
     *     console.log(`Generated UUID: ${uuid}`);
     * } else {
     *     console.log('Failed to generate a unique UUID.');
     * }
     *
     * @throws {Error} If there is an error executing the SQL query.
     */
    async generate_uuid() {
        const uuid = (await connexion.promise().query("SELECT UUID();"))[0][0]["UUID()"];
        const sql = `SELECT COUNT(*) FROM ${this.name} WHERE uuid="${uuid}";`;

        return new Promise((resolve, reject) => {
            connexion.promise().query(sql).then((rows) => {
                if (rows[0][0]['COUNT(*)'] == 0) return resolve(uuid);
                resolve(null);
            }).catch((err) => {
                error(`Error executing query: ${err}`);
                return null;
            })
        })
    }
}

/**
 * Represents an instance of a database model.
 * @class
 */
class ModelInstance {
    /**
     * Creates an instance of ModelInstance.
     * @param {string} name The name of the database table.
     * @param {Object} data The instance data.
     */
    constructor(name, data) {
        /**
         * The name of the database table.
         * @type {string}
         */
        this.name = name;

        /**
         * The instance data.
         * @type {Object}
         */
        this.data = data;
    }

    /**
     * Updates a single entry in the database table.
     * 
     * @param {Object} model An object containing the key-value pairs to use for updating.
     * @returns {Promise<Object>} A promise that resolves with updated data.
     * @throws {Error} Throws an error if the update fails.
     */
    async updateOne(model) {
        const sql = `UPDATE ${this.name} SET ${generateCondition(model, true)} WHERE ${generateCondition(this.data)}`;
        await connexion.promise().query(sql).catch((err) => {
            error(`Error executing query: ${err}`);
            throw err;
        });

        return replaceValues(this.data, model);
    }

    /**
     * Deletes a single entry in the database table.
     * @param {Object} model An object containing the key-value pairs to use for deletion.
     * @returns {Promise<Object>} A promise that resolves with the data deleted.
     * @throws {Error} Throws an error if the deletion fails.
     */
    async deleteOne(model) {
        const sql = `DELETE FROM ${this.name} WHERE ${generateCondition(model)}`;
        try {
            await connexion.promise().query(sql).catch((err) => {
                return error(`Error executing query: ${err}`);
            });
        } catch (err) {
            return error(`Error deleting data from ${this.name}: ${err}`);
        }

        return replaceValues(this.data, model);
    }

    /**
     * Runs a custom SQL query.
     * @param {string} custom The custom SQL query to execute.
     * @returns {Promise<void>} A promise that resolves when the query is executed.
     * @throws {Error} Throws an error if query execution fails.
     */
    async customRequest(custom) {
        try {
            await connexion.promise().query(custom).catch((err) => {
                return error(`Error executing query: ${err}`);
            })
        } catch (err) {
            return error(`Error executing query: ${err}`);
        }
    }
}

module.exports = { Schema, connect, logout, Model, client, sqlType };
