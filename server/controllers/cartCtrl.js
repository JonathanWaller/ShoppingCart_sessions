let id = 1;

//One way to handle getCart below...but I added this fix into the index.js file
// const getCart = (req,res)=>
//   if (!req.session.cart) {
//     req.session.cart = [];
//   }

const getCart = (req, res) => {
  res.status(200).json(req.session.cart);
};

const addToCart = (req, res) => {
  if (!req.body.title || !req.body.price) {
    res.status(500).json({ message: "Malformed Request" });
  }
  const itemToAdd = {
    // id: id
    id,
    ...req.body
  };
  req.session.cart.push(itemToAdd);
  id++;
  res.status(200).json(req.session.cart);
};

const deleteFromCart = (req, res) => {
  // one option
  // for(let i=0; i< req.session.cart.length; i++){
  //     if(req.session.cart[i]=== parseInt(req.params.id)){
  //         req.session.cart.splice(i,1);
  // }

  req.session.cart = req.session.cart.filter(
    val => val.id !== parseInt(req.params.id)
  );
  res.status(200).json(req.session.cart);
};

// const updateCartItem = (req, res) => {
//   //req.body.title , req.body.price
//   const index = req.session.cart.findIndex(
//     val => val.id === parseInt(req.params.id)
//   );
//   req.session.cart[index] = {
//     ...item,
//     price: req.body.price || item.price,
//     title: req.body.title || item.title
//   };
//   res.status(200).json(req.session.cart);
// };

const updateCartItem = (req, res) => {
  // req.body.title req.body.price
  const index = req.session.cart.findIndex(
    val => val.id === parseInt(req.params.id)
  );
  req.session.cart[index] = {
    ...req.session.cart[index],
    price: req.body.price || req.session.cart[index].price,
    title: req.body.title || req.session.cart[index].title
  };
  res.status(200).json(req.session.cart);
};

module.exports = {
  getCart,
  addToCart,
  deleteFromCart,
  updateCartItem
};
