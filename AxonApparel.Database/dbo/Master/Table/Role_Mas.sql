CREATE TABLE [dbo].[Role_Mas]
(
	RoleId [int] IDENTITY(1,1) NOT NULL,
	RoleName [varchar](40) NOT NULL,
	Remarks [varchar](100) NULL,
	CONSTRAINT [PK_Rolemas] PRIMARY KEY ([RoleId])
)
