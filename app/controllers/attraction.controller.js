const db = require("../models");
const Attraction = db.attractions;

// Retrieve all attractions from the database.
exports.findAll = (req, res) => {
  let attractionsList = [];
  let attractionsTypesList = [];
  Attraction.find({})
    .then((data) => {
      for (const [key, value] of Object.entries(data)) {
        if (value.Attraction_Type.includes(";")) {
          var arr = value.Attraction_Type.split(";");
          attractionsTypesList.push(...arr);
        } else {
          attractionsTypesList.push(value.Attraction_Type);
        }
        attractionsList.push({
          id: value.Id,
          name: value.Name,
          type: value.Attraction_Type,
          address: value.Address,
          openHours: value.Opening_Hours,
          x: value.X,
          y: value.Y,
          link: value.URL,
        });
      }
      res.json({
        attractionsTypesList: [...new Set(attractionsTypesList)],
        attractionsList: attractionsList,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving attractions.",
      });
    });
};
