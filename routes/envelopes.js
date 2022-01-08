import express from 'express';
import { getAllEnvelopes, addEnvelope, transferEnvelope, deleteEnvelope, searchEnvelope, updateEnvelope } from '../connections/queries.js';

const router = express.Router();



const findData = (data, parameter) => {
  return data.find(singleData => singleData.id === parseInt(parameter))
}

/**
*@swagger
*components:
*   parameters:
*       toParams:
*        - in: path
*          name: to
*          required: true
*          schema:
*             type: integer
*          description: Id of envelope to transfer to  
*       fromParams:
*        - in: path
*          name: from
*          required: true
*          schema:
*             type: integer
*          description: Id of envelope to transfer from   
*   schemas:
*     Envelopes:
*      type: object
*      required:
*        - title
*        - budget
*      properties:
*        id:
*          type: number
*          description: auto generated number for each envelope
*        title:
*          type: string
*          description: The title of each envelope
*        budget:
*          type: money
*          description: money alocated for each envelope
*      
*      example:
*       id: 1
*       title: food
*       budget: $500    
*/      

/**
 * @swagger
 * tags:
 *   name: Envelopes
 *   description: The Envelopes Managing API
 */


/**
 * @swagger
 * /api/envelopes:
 *   get:
 *     summary: returns the list of all envelopes
 *     tags: [Envelopes]
 *     responses:
 *       200:
 *         description: the request is successfull
 *         content:
 *           application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Envelopes'
 *        
 */

router.get('/', getAllEnvelopes);

/**
 * @swagger
 * /api/envelopes/{title}:
 *     get:
 *       summary: Gets envelopes by title
 *       tags: [Envelopes]
 *       parameters:
 *           - name: title
 *             in: path
 *             description: the Envelope title
 *             required: true
 *             schema:
 *                type: string
 *                  
 *       responses:
 *          200:
 *             description: succesfully fetched envelope by title
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/Envelopes'       
 *          404:
 *            description: Envelope with that TITLE not found
 *          500:
 *            description: There was a server error
 */

router.get('/:title',searchEnvelope);


/**
 * @swagger
 * /api/envelopes/:
 *     post:
 *       summary: add envelope into the database
 *       tags: [Envelopes]
 *       requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                      schema:
 *                         $ref: '#components/schemas/Envelopes'
 *                  
 *       responses:
 *          200:
 *             description: succesfully added envelope to the database
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/Envelopes'       
 *          503:
 *            description: Envelope could not be added to the database
 *          500:
 *            description: There was a server error
 */
router.post('/', addEnvelope);

/**
 * @swagger
 * /api/envelopes/transfer/{from}/{to}:
 *     post:
 *       summary: transfer from one envelope into another
 *       tags: [Envelopes]
 *       requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                      schema:
 *                         type: object
 *                         required:
 *                           - budget
 *                         name: budget
 *                         description: The amount to be transfered
 *                         properties:
 *                            budget:
 *                              type: number
 *                              description: The amount to transfer
 *       parameters:
 *           - in: path
 *             name: from
 *             required: true
 *             description: Id of envelope to transfer from
 *             schema:
 *                 type: integer
 * 
 *           - in: path
 *             name: to
 *             required: true
 *             description: Id of envelope to transfer to
 *             schema:
 *                type: integer
 *                 
 *       responses:
 *          200:
 *             description: succesfully added envelope to the database
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/Envelopes'       
 *          503:
 *            description: Envelope could not be added to the database
 *          500:
 *            description: There was a server error
 */

router.post('/transfer/:from/:to',transferEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *     delete:
 *       summary: Delete envelope by id
 *       tags: [Envelopes]
 *       parameters:
 *           - name: id
 *             in: path
 *             description: the Envelope id
 *             required: true
 *             schema:
 *                type: integer
 *                  
 *       responses:
 *          200:
 *             description: succesfully deleted envelope by id
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/Envelopes'       
 *          404:
 *            description: Envelope with that Id not found
 *          500:
 *            description: There was a server error
 */


router.delete('/:id',deleteEnvelope);

/**
 * @swagger
 * /api/envelopes/{id}:
 *     put:
 *       summary: update envelope 
 *       tags: [Envelopes]
 *       requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                      schema:
 *                         $ref: '#components/schemas/Envelopes'
 *       parameters:
 *           - name: id
 *             in: path
 *             description: the Envelope id
 *             required: true
 *             schema:
 *                type: number
 *                  
 *       responses:
 *          200:
 *             description: succesfully updated envelope
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/Envelopes'       
 *          404:
 *            description: Envelope not found
 *          500:
 *            description: There was a server error
 */
router.put('/:id',updateEnvelope)




export default router;