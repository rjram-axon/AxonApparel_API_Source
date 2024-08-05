CREATE TABLE [dbo].[OpenDebitItemDet]
(
    [DebitDetId] [int] IDENTITY(1,1) NOT NULL,
	[DebitID] [int] NOT NULL,
    [Order_No] [varchar](20) NULL,
	[RefNo] [varchar](50) NULL,
	[WorkNo] [varchar](20) NULL,
	[Itemid] [int] NOT NULL,
	[Colorid] [int] NOT NULL,
	[Sizeid] [int] NOT NULL,
	[Quantity] [numeric](12, 3) NOT NULL,
	[Rate] [numeric](12, 3) NULL, 
    CONSTRAINT [PK_OpenDebitItemDet] PRIMARY KEY ([DebitDetId]), 
    CONSTRAINT [FK_OpenDebitItemDet_OpenDebitMas] FOREIGN KEY ([DebitID]) REFERENCES [OpenDebitMas]([DebitId])

)
