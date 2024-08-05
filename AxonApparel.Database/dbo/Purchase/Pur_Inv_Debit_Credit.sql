CREATE TABLE [dbo].[Pur_Inv_Debit_Credit]
(
    [Debit_CreditID] [int] IDENTITY(1,1) NOT NULL, 
	[Pur_Inv_id] [int] NOT NULL,
	[Head] [varchar](100) NULL,
	[CreditAmount] [numeric](15, 5) NOT NULL DEFAULT (0),
	[DebitAmount] [numeric](15, 5) NOT NULL DEFAULT (0),
	[Reason] [varchar](1000) NULL,
    CONSTRAINT [PK_Pur_Inv_Debit_Credit] PRIMARY KEY ([Debit_CreditID]), 
    CONSTRAINT [FK_Pur_Inv_Debit_Credit_Pur_Inv_Mas] FOREIGN KEY ([Pur_Inv_id]) REFERENCES [Pur_Inv_Mas]([pur_invid])
)
