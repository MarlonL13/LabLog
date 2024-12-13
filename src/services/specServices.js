import { ProductSpec, Product, Location } from "../models/index.js";
import { createRecord, updateRecord } from "./commonServices.js";
import { Op, Sequelize } from "sequelize";

const createSpec = async (body) => {
  return await createRecord(ProductSpec, body);
};

const updateSpec = async (specId, body) => {
  return await updateRecord(ProductSpec, specId, body);
};

const getSpectById = async (specId) => {
  const spectData = await ProductSpec.findByPk(specId, {
    attributes: { exclude: ["id"] },
    include: [
      {
        model: Product,
        as: "products",
        required: false,
        where: { condition: ["opened", "unopened"] },
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
  return spectData;
};

const searchSpec = async (query) => {
  const specs = await ProductSpec.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { abbreviation: { [Op.iLike]: `%${query}%` } },
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
  return specs;
};

export const specServices = {
  createSpec,
  updateSpec,
  getSpectById,
  searchSpec,
};
