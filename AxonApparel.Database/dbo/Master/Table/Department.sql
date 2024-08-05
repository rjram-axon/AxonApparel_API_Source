CREATE TABLE [dbo].[Department]
(
	[Id] INT  PRIMARY KEY IDENTITY(1,1)  NOT NULL, 
    [Department] NVARCHAR(40) NOT NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
)
