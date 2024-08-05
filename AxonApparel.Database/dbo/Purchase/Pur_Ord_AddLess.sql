CREATE TABLE [dbo].[Pur_Ord_AddLess]
(
	  [Pur_Ord_Discountid] INT IDENTITY(1,1) NOT NULL, 
	  [Pur_Ord_id] [int] NOT NULL,
	[Addlessid] [int] NULL,
	[Percentage] [numeric](5, 2) NOT NULL DEFAULT (0),
	[PlusOrMinus] [varchar](1) NOT NULL,
	[Amount] [numeric](15, 5) NOT NULL DEFAULT (0),
      CONSTRAINT [PK_Pur_Ord_AddLess] PRIMARY KEY ([Pur_Ord_Discountid]), 
      CONSTRAINT [FK_Pur_Ord_AddLess_Pur_Ord_Mas] FOREIGN KEY ([Pur_Ord_id]) REFERENCES [Pur_ord_Mas]([Pur_ord_id]), 
	  CONSTRAINT [FK_Pur_Ord_AddLess_AddLess] FOREIGN KEY ([Addlessid]) REFERENCES [AddLess]([AddlessId]), 
    CONSTRAINT [CK_Pur_Ord_AddLess_PlusOrMinus] CHECK (([plusorminus] = '+' or [plusorminus] = '-'))
)
