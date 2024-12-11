import { ProductSpec, Product, Location } from "../models/index.js";
import Sequelize from "sequelize";
import { Op } from "sequelize";

export const getSpectById = async (req, res) => {
  try {
    const specId = req.params.id;
    const spectData = await ProductSpec.findByPk(specId, {
      include: [
        {
          model: Product,
          as: "products",
          required: false,
          where: {condition: ["opened", "unopened"]},
          attributes: [
            "id",
            "status",
            "condition",
            [
              Sequelize.fn(
                "ROUND",
                Sequelize.literal(
                  "current_amount / CAST(product_spec.size AS numeric)"
                ),
                2 // Round the result to 2 decimal places
              ),
              "percent_remaining", // Alias for the calculated field
            ],
          ],
          include: {
            model: Location,
            as: "location",
            attributes: ["laboratory", "sub_location"],
          },
        },
      ],
    });
    if (spectData) {
      res.status(200).json(spectData);
    } else {
      res.status(404).json({ message: "Product spec not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchSpec = async (req, res) => {
  try {
    const { name } = req.query;
    const specs = await ProductSpec.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { abbreviation: { [Op.iLike]: `%${name}%` } },
        ],
      },
      attributes: {
        exclude: ["size", "unit", "alert_threshold"],
      },
      include: [
        {
          model: Product,
          as: "products",
          required: false,
          attributes: [
            [
              Sequelize.literal(
                "(SELECT COUNT(*) FROM product WHERE product.spec_id = product_spec.id AND product.condition = 'unopened')"
              ),
              "total_unopened",
            ],
            [
              Sequelize.literal(
                "(SELECT COUNT(*) FROM product WHERE product.spec_id = product_spec.id AND product.condition = 'opened')"
              ),
              "total_opened",
            ],
          ],
        },
      ],
    });
    if (specs.length > 0) {
      res.status(200).json(specs);
    } else {
      res.status(404).json({ message: "No product specs found" });
    }
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};
