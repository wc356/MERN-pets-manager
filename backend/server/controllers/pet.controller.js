const { Pet } = require("../models/pet.model");

module.exports.index = (req, res) => {
  res.json({
    message: "Welcome to the Pet Shelter!",
  });
};

module.exports.createPet = (req, res) => {
  const { name, type, description, skill_1, skill_2, skill_3 } = req.body;
  Pet.create({ name, type, description, likes: 0, skill_1, skill_2, skill_3 })
    .then((pet) => res.json(pet))
    .catch((err) => res.status(400).json(err));
};

module.exports.getAllPets = (req, res) => {
  Pet.find({}, null, { sort: { type: 1 } })
    .then((pets) => res.json(pets))
    .catch((err) => res.json(err));
};

module.exports.getPet = (req, res) => {
  Pet.findOne({ _id: req.params.id })
    .then((pet) => res.json(pet))
    .catch((err) => res.json(err));
};

module.exports.updatePet = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedPet) => res.json(updatedPet))
    .catch((err) => res.status(400).json(err));
};

module.exports.deletePet = (req, res) => {
  Pet.deleteOne({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.json(err));
};
