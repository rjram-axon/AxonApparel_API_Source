CREATE TABLE [dbo].[Pur_Ord_Pay]
(
	[Pur_Ord_PayId] INT IDENTITY(1,1) NOT NULL, 
    [pur_ord_id] [int] NOT NULL,
	[paymode] [varchar](10) NOT NULL,
	[chequeno] [varchar](30) NULL,
	[chequedate] [datetime] NULL,
	[advance] [numeric](15, 5) NOT NULL
    CONSTRAINT [PK_Pur_Ord_Pay] PRIMARY KEY ([Pur_Ord_PayId]) DEFAULT (0), 
    CONSTRAINT [FK_Pur_Ord_Pay_Pur_ord_mas] FOREIGN KEY ([pur_ord_id]) REFERENCES [Pur_Ord_Mas]([pur_ord_id]), 
    CONSTRAINT [CK_Pur_Ord_Pay_paymode] CHECK (([paymode]='DD' OR [paymode]='Cheque' OR [paymode]='Cash' OR [paymode]='LC' OR [paymode]='RTGS' OR [paymode]='NEFT'))
)
