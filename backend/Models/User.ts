'use strict';


export interface IUser {
    name: string,
    password: string,
    created_at: Date,
    updated_at:  Date,
    deleted_at: Date
};


module.exports = (sequalize, dataType) => {
    const User = sequalize.define('Users', {
        name: dataType.STRING,
        password: dataType.STRING,
        created_at: {
            type: dataType.DATE,
            allowNull: false
        },
        updated_at:  dataType.DATE,
        deleted_at: dataType.DATE
    },{
        underscored: true
        // classMethods: {
        //     associate: (models) =>{
        //         User.hasMany(models.Test)
        //     }
        // }
    });
    return User;
};







// module.exports = {
//     defineUser: async (sequalize, type) => {
//         return await sequalize.define('user', {
//             id: {
//                 type: type.INTEGER,
//                 primaryKey: true,
//             },
//             email: type.STRING,
//             password: type.STRING
//         })
//     },
//
//     createUser: async (email, password) => {
//         if(!email || !password){
//             throw new Error('missing params')
//         }
//         const hashedPassword = await new Promise((resolve, reject) => {
//             bcrypt.hash(password, salt, (err, hash) => {
//                 if(err)
//                     reject(err);
//                 else
//                     resolve(hash);
//             })
//         });
//         const newUser = {
//             id: uuidv4(),
//             email: email,
//             password: hashedPassword
//         };
//
//         return this.defineUser.create(newUser);
//     },
//
//     getAllUsers: async() => {
//         return await this.defineUser.findAll()
//     }
//
//
// };

