import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_depts from "./tbl_depts.js";
import _tbl_iolist from "./tbl_iolist.js";
import _tbl_products from "./tbl_products.js";
import _tel_members from "./tel_members.js";

export default function initModels(sequelize) {
  const tbl_depts = _tbl_depts.init(sequelize, DataTypes);
  const tbl_iolist = _tbl_iolist.init(sequelize, DataTypes);
  const tbl_products = _tbl_products.init(sequelize, DataTypes);
  const tel_members = _tel_members.init(sequelize, DataTypes);

  return {
    tbl_depts,
    tbl_iolist,
    tbl_products,
    tel_members,
  };
}
