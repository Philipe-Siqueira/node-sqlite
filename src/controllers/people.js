const yup = require('yup');
const { People } = require('../models');

const { rules } = require('../config/validation');

exports.create = (request, response) => {
  const account_id = request.id;
  const { name, surname, age, gender } = request.body;
  People.create({ name, surname, age, gender, account_id })
  .then(people => {
    return response.status(201).json({ people });
  })
  .catch(err => {
    return response.status(500).json({
     message: err.errors[0].message,
     key: err.errors[0].path
    });
   });
 };

 exports.read = (request, response) => {
  const account_id = request.id;
  return response.status(200).json('People test');
 };

 exports.findOne = async (request, response) => {
  const account_id = request.id;
  const { id } = request.params;
  const people = await People.findOne({ where: {id, account_id}});
  if(!people) return response.status(200).json('Not found.');
  return response.status(200).json(people);
 };

 exports.update = (request, response) => {
  const account_id = request.id;
  const { id } = request.params;
  const { body } = request;
  const fields = ['name', 'surname', 'age', 'gender'];
  People.findOne({
    where: { id, account_id}
  })
  .then(people => {
    fields.map((fieldName)=>{
      const newValue = body[fieldName];
      if(newValue) people[fieldName] = newValue;
    })
    people.save();
    return response.status(200).json({ people });
  })
  .catch(err => {
    return response.status(500).json({
     message: err.errors[0].message,
     key: err.errors[0] .path
    });
   });
 };

 exports.delete = (request, response) => {
  const account_id = request.id;
  const { id } = request.params;
  People.findOne({ where: {id, account_id}})
  .then(people => {
    people.destroy()
    .then(() =>{
      return response.status(202).json({ message: 'Register Removed!' })
    });

  })
  .catch(err => {
    return response.status(200).json('Not found.');
   });
 };
