CREATE TABLE [dbo].[Pur_Ord_Term]
(
	[RecId] [int] IDENTITY(1,1) NOT NULL primary key,
	[PurOrdId] [int] NOT NULL,
	[TermId] [int] NOT NULL,
	[Descriptions] [varchar](100) NULL,
	
	CONSTRAINT [FK_PurOrdid] FOREIGN KEY([PurOrdId]) REFERENCES [dbo].[Pur_Ord_Mas] ([pur_ord_id]),
	CONSTRAINT [FK_PurTermid] FOREIGN KEY([TermId]) REFERENCES [dbo].[TermMas] ([TermId])
)
