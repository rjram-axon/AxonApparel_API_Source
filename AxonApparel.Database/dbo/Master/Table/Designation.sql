CREATE TABLE [dbo].[Designation]
(
	[Id] INT PRIMARY KEY IDENTITY(1,1)  NOT NULL, 
    [Designation] NVARCHAR(40) NOT NULL, 
    [IsActive] BIT NOT NULL DEFAULT 1, 
)
