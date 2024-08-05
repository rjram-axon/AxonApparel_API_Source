CREATE TABLE [dbo].[Pur_Inv_Dc]
(
	[Pur_Inv_DcId] INT IDENTITY(1,1) NOT NULL, 
	[pur_invid] [int] NULL,
	[pur_grn_masid] [int] NULL,
    CONSTRAINT [FK_Pur_Inv_Dc_Pur_Inv_Mas] FOREIGN KEY ([pur_invid]) REFERENCES [Pur_Inv_Mas]([Pur_invid]), 
	CONSTRAINT [FK_Pur_Inv_Dc_Pur_Grn_Mas] FOREIGN KEY ([pur_grn_masid]) REFERENCES [Pur_grn_Mas]([grn_masid]), 
    CONSTRAINT [PK_Pur_Inv_Dc] PRIMARY KEY ([Pur_Inv_DcId])
)
