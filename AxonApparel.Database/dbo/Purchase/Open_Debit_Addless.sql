CREATE TABLE [dbo].[Open_Debit_Addless]
(
	[Debit_AddLessId] [int] IDENTITY(1,1) NOT NULL,
	[addless_id] [int] NULL,
	[Debit_Id] [int] NULL,
	[percentage] [numeric](7, 2) NULL,
	[amount] [numeric](15, 5) NOT NULL,
	[aorl] [varchar](1) NULL, 
    CONSTRAINT [PK_Open_Debit_Addless] PRIMARY KEY ([Debit_AddLessId]), 
    CONSTRAINT [FK_Open_Debit_Addless_addless] FOREIGN KEY ([addless_id]) REFERENCES [addless]([addlessid]),
	 CONSTRAINT [FK_Open_Debit_Addless_OpenDebitMas] FOREIGN KEY ([Debit_Id]) REFERENCES [OpenDebitMas]([DebitId])
)
