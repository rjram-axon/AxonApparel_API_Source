CREATE TABLE [dbo].[Pur_Grn_AddLess]
(
	[Grn_OrdAddLess_Id] [int] IDENTITY(1,1) NOT NULL, 
    [grn_masid] [int] NOT NULL,
	[company_unitid] [int] NULL,
	[addlessid] [int] NULL,
	[amount] [numeric](12, 2) NULL,
	[aorl] [varchar](1) NULL
    CONSTRAINT [PK_Pur_Grn_AddLess] PRIMARY KEY ([Grn_OrdAddLess_Id]), 
    CONSTRAINT [FK_Pur_Grn_AddLess_Grn_Mas] FOREIGN KEY ([grn_masid]) REFERENCES [Pur_Grn_Mas]([Grn_MasId]), 
	CONSTRAINT [FK_Pur_Grn_AddLess_AddLess] FOREIGN KEY ([addlessid]) REFERENCES [AddLess]([AddlessId]),
	CONSTRAINT [CK_Pur_Grn_AddLess_PlusOrMinus] CHECK (([aorl] = '+' or [aorl] = '-'))
)
