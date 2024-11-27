import sequelize from "../config/connection.js";
import User from "./User.js";
import Project from "./Project.js";
import ProjectParticipant from "./Project_paticipant.js";
import Location from "./Location.js";
import Product from "./Product.js";
import ProductSpec from "./Product_spec.js";
import Equipment from "./Equipment.js";
import Reservation from "./Reservation.js";

// User and project
Project.belongsTo(User, {
  foreignKey: "coordinator_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

User.hasMany(Project, {
  foreignKey: "coordinator_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Project and project participant
ProjectParticipant.belongsTo(Project, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Project.hasMany(ProjectParticipant, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// User and project participant
ProjectParticipant.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(ProjectParticipant, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Product and product spec
Product.belongsTo(ProductSpec, {
  foreignKey: "spec_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

ProductSpec.hasMany(Product, {
  foreignKey: "spec_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Product and project
Product.belongsTo(Project, {
  foreignKey: "project_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Project.hasMany(Product, {
  foreignKey: "project_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Product and location
Product.belongsTo(Location, {
  foreignKey: "location_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Location.hasMany(Product, {
  foreignKey: "location_id",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

// Reservation and equipment
Reservation.belongsTo(Equipment, {
  foreignKey: "equipment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Equipment.hasMany(Reservation, {
  foreignKey: "equipment_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Reservation and project
Reservation.belongsTo(Project, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Project.hasMany(Reservation, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Reservation and user (coordinator)
Reservation.belongsTo(User, {
  foreignKey: "requester_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Reservation, {
  foreignKey: "requester_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export {
  sequelize,
  User,
  Project,
  ProjectParticipant,
  Location,
  Product,
  ProductSpec,
  Equipment,
  Reservation,
};
