CREATE TABLE [dbo].[Pur_Inv_Addless]
(
	[Pur_Inv_AddlessId] INT IDENTITY(1,1) NOT NULL,
	[pur_invid] [int] NOT NULL,
	[company_unitid] [int] NULL,
	[addless_id] [int] NULL,
	[percentage] [numeric](7, 2) NOT NULL DEFAULT (0),
	[amount] [numeric](15, 5) NOT NULL DEFAULT (0),
	[aorl] [varchar](1) NULL, 
    CONSTRAINT [PK_Pur_Inv_Addless] PRIMARY KEY ([Pur_Inv_AddlessId]),	   
    CONSTRAINT [FK_Pur_Inv_Addless_Pur_Inv_Mas] FOREIGN KEY ([pur_invid]) REFERENCES [Pur_Inv_Mas]([pur_invid]), 
    CONSTRAINT [FK_Pur_Inv_Addless_ToTable] FOREIGN KEY ([addless_id]) REFERENCES [Addless]([AddlessId])
)
