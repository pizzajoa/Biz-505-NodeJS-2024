import Sequelize from "sequelize";
const book = (sequelize) => {
  const book_table = {
    isbn: {
      type: Sequelize.DataTypes.STRING(13),
      primaryKey: true, // pk선언
      defaultValue: "",
    },
    title: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // Nut null 선언
      defaultValue: "",
    },
    author: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // Nut null 선언
      defaultValue: "",
    },
    publisher: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // Nut null 선언
      defaultValue: "",
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false, // Nut null 선언
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false, // Nut null 선언
      defaultValue: 0,
    },
  };
  return sequelize.define("tbl_books", book_table, {
    // sequelize 라는 변수를 선업하고, book함수에서 매개변수로 받은 sequelize를 값으로 세팅한다
    // 단 선언하는 변수명과, 세팅하는 값이 담긴 변수명이 같으면 값이 감긴 변수명을 생략할 수 있다
    // sequelize : sequelize이 명령문을 sequelize만 사용해도 된다
    sequelize,
    tableName: "tbl_books",
    timestamps: false,
  });
};

export default book;
