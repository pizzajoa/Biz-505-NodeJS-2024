CREATE DATABASE memodb;
USE memodb;
DROP TABLE tbl_memo;
CREATE TABLE tbl_memo
(m_seq	BIGINT	AUTO_INCREMENT	PRIMARY KEY,
m_author	VARCHAR(25)	NOT NULL,	
m_date	VARCHAR(10)	NOT NULL	,
m_time	VARCHAR(10)	NOT NULL	,
m_title VARCHAR(50) NOT NULL,
m_memo	VARCHAR(400)	NOT NULL,	
m_image	VARCHAR(255)		
);

SELECT *
FROM tbl_memo;