CREATE TABLE [dbo].[Ledger]
(
	[LedgerId] INT IDENTITY(1,1) NOT NULL, 
	[Ledger] [varchar](50) NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1),
    CONSTRAINT [PK_Ledger] PRIMARY KEY ([LedgerId])
)
