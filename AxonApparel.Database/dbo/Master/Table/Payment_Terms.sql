CREATE TABLE [dbo].[Payment_Terms]
(
	[Pay_Termid] [int] IDENTITY(1,1) NOT NULL,
	[Pay_Term] [varchar](100) NULL,
	[IsActive] [bit] Default(1) NOT NULL, 
    CONSTRAINT [PK_Payment_Terms] PRIMARY KEY ([Pay_Termid])
)
