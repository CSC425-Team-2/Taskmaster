SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE dbo.usp_lfelisky_Taskmaster
AS
BEGIN
	DROP TABLE IF EXISTS Task;
	
	CREATE TABLE Task (
		TaskID INT PRIMARY KEY,
		TaskName VARCHAR(50),
		TaskDescription VARCHAR(150),
		TaskDue DATE
	);
END
GO

EXEC dbo.usp_lfelisky_Taskmaster;
