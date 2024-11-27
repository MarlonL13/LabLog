import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class ProductSpec extends Model {}

ProductSpec.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING(20),
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM("mg", "g", "kg", "ml", "L", "items"),
      allowNull: false,
    },
    alert_threshold: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "product_spec",
  }
);

export default ProductSpec;
