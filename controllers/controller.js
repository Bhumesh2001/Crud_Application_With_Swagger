const { User } = require('../model/userModel');

/**
 * @swagger
 * /create-user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       description: create a new record 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                  type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: User record created successfully
 *       400:
 *         description: Bad request, check your request body
 */

const registerUser = async (req, res) => {
    try {
        const userData = new User(req.body);
        const data = await userData.save();
        res.status(201).json({ data });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            res.status(400).json({ error: 'Validation Error', details: validationErrors });
        } else if (error.code === 11000) {
            res.status(400).json({ error: 'Duplicate key violation' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        };
    };
};

/**
 * @swagger
 * components:
 *      schema:
 *          get-users:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  mobile:
 *                      type: string
 *                  city: 
 *                      type: string
 */

/**
 * @swagger
 * /get-user/{email}:
 *      get:
 *          summary: fetch single user by its email id
 *          description: this api is used to fetch data from mongodb
 *          parameters:
 *              - in: path
 *                name: email
 *                required: true
 *                schema:
 *                  type: string               
 *          responses:
 *              200:
 *                  description: this api is used to fetch data from mongodb
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#components/schema/get-users'
 */

const getUser = async (req, res) => {
    try {
        const email = req.params.email;
        const Users = await User.find({ email });
        if(Users.length == 0){
            return res.status(404).json({ message: "User Not Found" });
        }
        console.log(Users);
        res.status(200).json({ Users });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    };
};

/**
 * @swagger
 * /update-user:
 *   patch:
 *     summary: update a user
 *     requestBody:
 *       description: update user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                  type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request, check your request body
 */

const updateUser = async (req, res) => {
    try {
        const updatedData = await User.findOneAndUpdate({ email: req.body.email }, { $set: req.body }, { new: true });
        console.log(updatedData);
        res.status(200).json({ updatedData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    };
};


/**
 * @swagger
 * /delete-user/{email}:
 *   delete:
 *     summary: Delete a user 
 *     description: Delete a user by its email id.
 *     parameters:
 *       - in: path
 *         name: email
 *         description: delete the user by email id.
 *         required: true
 *         schema:
 *              type: string    
 *     responses:
 *       200:
 *         description: Successful deletion
 *       500:
 *         description: Internal server error
 */

const deleteUser = async (req, res) => {
    try {
        const email = req.params.email;
        const deletedData = await User.findOneAndDelete({ email }, { new: true });
        if(deletedData == null){
            return res.status(404).json({ message: 'Record not found' });
        }
        console.log(deletedData);
        res.status(200).json(deletedData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    };
};

module.exports = {
    registerUser,
    getUser,
    updateUser,
    deleteUser,
};