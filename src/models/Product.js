import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    spec_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "product_spec",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("in_use", "unused"),
      allowNull: false,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "project",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    condition: {
      type: DataTypes.ENUM("opened", "unopened", "finished"),
      allowNull: false,
    },
    laboratory: {
      type: DataTypes.ENUM("lab1", "lab2"),
      allowNull: false,
    },
    location_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "location",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    current_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date_received: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "product",
  }
);

export default Product;
