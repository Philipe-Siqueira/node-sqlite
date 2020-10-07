const yup = require('yup');
const { Products } = require('../models');


exports.create = (request, response) => {
  const { account_id } = request;

  const { amaunt, name, category, description,minimun, received_in, product_validity } = request.body;
  Products.create({
    amaunt,
    name,
    category,
    description,
    minimun,
    received_in,
    received_by: account_id,
    product_validity
  })
  .then(product => {
    return response.status(201).json({ data: product });
  })
  .catch(err => {
    return response.status(500).json({
      message: err.errors[0].message,
      key: err.errors[0].path
    });
  });
};

exports.read = (request, response) => {
  const { account_id } = request;
  const { page } = request.query;
  let limit = 10;
  let offset = 0 + (page - 1) * limit;
  console.log(page);
  const products = Products.findAndCountAll().then( product => {
    return response.status(200).json({
      meta:{
        total: product.count,
        per_page: limit,
        current_page: page,
        last_page: 4,
        first_page_url: `${process.env.NODE_APP_URL}?page=1`,
        last_page_url: `${process.env.NODE_APP_URL}?page=2`,
        next_page_url: `${process.env.NODE_APP_URL}?page=2`,
        prev_page_url: `${process.env.NODE_APP_URL}?page=1`,
        path: `${process.env.NODE_APP_URL}`,
        from: 1,
        to: 15,
      },
      data: product.rows
    });
  })
  .catch(err => {
    return response.status(500).json({
      message: err.errors[0].message,
      key: err.errors[0].path
    });
  });
};
