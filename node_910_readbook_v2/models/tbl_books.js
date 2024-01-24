import sequlize from "sequelize";

// seq : sequelize 도구에서 제공하는 data 객체 생성 도구
const books = (seq) => {
  const book_table = {
    isbn: {
      type: sequlize.DataTypes.STRING(13),
      primaryKey: true,
    },
    title: {
      type: sequlize.DataTypes.STRING(50),
      allowNull: false,
    },
    author: {
      type: sequlize.DataTypes.STRING(50),
      allowNull: false,
    },
    publisher: {
      type: sequlize.DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: sequlize.DataTypes.INTEGER,
    },
    discount: {
      type: sequlize.DataTypes.INTEGER,
    },
  };

  const seq_init = {
    sequlize: seq,
    tableName: "tbl_books",
  };

  return seq.define("tbl_books", book_table, seq_init);
};
export default books;
