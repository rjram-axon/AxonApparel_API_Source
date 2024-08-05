CREATE TABLE [dbo].[Pur_Debit_Others]
(
	[Debit_detotherid] [int] IDENTITY(1,1) NOT NULL,
	[Debit_id] [int] NULL,
	[sDesc] [varchar](30) NULL,
	[Reason] [varchar](50) NULL,
	[Amount] [numeric](14, 2) NULL DEFAULT (0.000), 
    CONSTRAINT [PK_Pur_Debit_Others] PRIMARY KEY ([Debit_detotherid]), 
    CONSTRAINT [FK_Pur_Debit_Others_Pur_Debit_Mas] FOREIGN KEY ([Debit_id]) REFERENCES [Pur_Debit_Mas]([Debit_id])
)
